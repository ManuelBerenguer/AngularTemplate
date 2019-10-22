import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize, map, retry } from 'rxjs/operators';
import { IDictionary, User, UsersRepository } from 'shared-lib';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';
import { DictionaryStatsMapper } from './mappers/dictionary-stats.mapper';
import { AssetLinkTypeEnum } from '../../../core/enums/asset-link-type.enum';

@Injectable()
export class AssetsMockApiRepository extends AssetsRepository implements OnDestroy {

  private loggedUser$ = this.usersRepository.getAuthenticatedUser();
  private user: User;
  private subscriptions: Array<Subscription> = [];

  private retry = 5;

  private assetsAPIBaseURL = 'https://localhost:44337/api/Assets/';
  // 'https://storelitetest.azurewebsites.net/api/Assets/';
  // 'https://localhost:44337/api/Assets/';

  constructor(
    private statsMapper: DictionaryStatsMapper,
    protected usersRepository: UsersRepository,
    private httpClient: HttpClient) {
    super();
    this.registerSubscriptions();
  }

  private registerSubscriptions(): void {

    // Subscribe to user details
    this.subscriptions.push(
      this.loggedUser$.subscribe(
        (user: any) => {
          if (user) {
            this.user = user;
          }
        }
      )
    );
  }

  public getStats(): Observable<Stats> {

    const getStatsUrl = `${this.assetsAPIBaseURL}GetStats/${this.user.clientId}`;
    const stats$ = this.httpClient.get<IDictionary<any>>(getStatsUrl);

    const result = stats$.pipe(
      retry(this.retry),
      map(data => {
          console.log('AssetsMockApiRepository', data);
          return (this.statsMapper.mapTo(data));
        }
        // ,
        // catchError(err => {
        //     console.log('caught mapping error and rethrowing', err);
        //     return throwError(err);
        // })
      )
    );

    return result;
  }

  public uploadAssets(files: FileList, mode: AssetLinkTypeEnum): Observable<{progress: number, completed: boolean, sucess: boolean}> {


    const sub = new Subject<{progress: number, completed: boolean, sucess: boolean}>();

    const formData: FormData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('Files', file, file.name);
    });

    formData.append('LinkType', mode.toString());

    const uploadURL = `${this.assetsAPIBaseURL}UploadAssets/${this.user.clientId}/${this.user.userId}`;
    const request = new HttpRequest('POST', uploadURL, formData, {
      reportProgress: true
    });


    // return this.httpClient.request(request).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap(message => this.showProgress(message)),
    //   last(), // return last (completed) message to caller
    //   catchError(this.handleError(file))
    // );

    const requestSubscription: Subscription = this.httpClient.request(request)
      .pipe(
        finalize(() => {
          console.log('UploadRequest finalize');
          // Upload finished. Whether successful or failed.
          sub.complete();
          requestSubscription.unsubscribe();
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('UploadRequest UploadProgress', event);
          const percentDone = Math.round(100 * event.loaded / event.total);
          // console.log('UploadProgress', percentDone);
          sub.next({progress: percentDone, completed: false, sucess: false});
        } else if (event instanceof HttpResponse) {
          console.log('UploadRequest HttpResponse', event);
          sub.next(({progress: 100, completed: true, sucess: true}));
        }

      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('UploadRequest Error', err.error);
          // A client-side or network error occurred. Handle it accordingly.
        } else {
          console.log('UploadRequest HttpErrorResponse', err);
          // The backend returned an unsuccessful response code.
        }

        sub.next({progress: null, completed: true, sucess: false});
        sub.complete();

      }, () => {
        console.log('UploadRequest Complete');
        sub.complete();
      });

    return sub.asObservable();
  }

  ngOnDestroy() {
    console.log('AssetsMockApiRepository', 'ngOnDestroy AssetsMockApiRepository');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
