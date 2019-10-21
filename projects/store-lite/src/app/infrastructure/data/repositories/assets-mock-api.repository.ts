import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { IDictionary, User, UsersRepository } from 'shared-lib';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';
import { DictionaryStatsMapper } from './mappers/dictionary-stats.mapper';

@Injectable()
export class AssetsMockApiRepository extends AssetsRepository implements OnDestroy {

  private loggedUser$ = this.usersRepository.getAuthenticatedUser();
  private user: User;
  private subscriptions: Array<Subscription> = [];

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

    const getStatsUrl = `https://localhost:44337/api/Assets/GetStats/${this.user.clientId}`;
    const stats$ = this.httpClient.get<IDictionary<any>>(getStatsUrl);

    const result = stats$.pipe(
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


  public uploadAssets1(files: FileList): Observable<any> {

    const formData: FormData = new FormData();

    Array.from(files).forEach((file, index) => {
        formData.append('files', file, file.name);
      });



    const uploadURL = `https://localhost:44337/api/Assets/UploadAssets/${this.user.clientId}/${this.user.userId}`;

    return this.httpClient.post<any>(uploadURL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      console.log(event);
      switch (event.type) {

        case HttpEventType.UploadProgress:

          const progress = Math.round(100 * event.loaded / event.total);

          console.log(progress);

          return { status: 'progress', message: progress };

        case HttpEventType.Response:

          console.log(event.body);

          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );

  }


  public uploadAssets(files: FileList): Observable<any> {


    const sub = new Subject<any>();

    const request = this.createRequest(files);
    this.httpClient.request(request)
      .pipe(
        finalize(() => {
          // Upload beendet. Egal ob erfolgreich oder fehlgeschlagen.
          sub.complete();
          console.log('finalize');
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log('UploadProgress', percentDone);
          sub.next(percentDone);
        } else if (event instanceof HttpResponse) {
          sub.complete();
          console.log('HttpResponse', event);
        }

      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Error', err.error);
          // A client-side or network error occurred. Handle it accordingly.
          sub.complete();
        } else {
          console.log('HttpErrorResponse', err);
          // The backend returned an unsuccessful response code.
          sub.complete();
        }


      }, () => {
        console.log('????????');
        sub.complete();
      });

    return sub.asObservable();
  }


  private createRequest(files: FileList): HttpRequest<FormData> {
    const formData: FormData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('files', file, file.name);
    });

    const uploadURL = `https://storelitetest.azurewebsites.net/api/Assets/UploadAssets/${this.user.clientId}/${this.user.userId}`;
    const request = new HttpRequest('POST', uploadURL, formData, {
      reportProgress: true
    });

    return request;
  }

  /*

  public uploadAssets(files: FileList): Observable<number> {

    const formData: FormData = new FormData();

    Array.from(files).forEach((file, index) => {
        formData.append('files', file, file.name);
      });

    // create a new progress-subject for every file
    const progress = new Subject<number>();

    // send the http-request and subscribe for progress-updates
    this.httpClient.post(`https://localhost:44337/api/Assets/UploadAssets/${this.user.clientId}/${this.user.userId}`, formData)
    .subscribe((event: any) => {

      console.log(event);

      if (event.type === HttpEventType.UploadProgress) {
        // on progress code
        console.log(Math.round(100 * event.loaded / event.total));
        // calculate the progress percentage
        const percentDone = Math.round(100 * event.loaded / event.total);
        progress.next(percentDone);
      }
      if (event.type === HttpEventType.Response) {
        // on response code
        progress.complete();
      }
    }, error => {
      // on error code
      console.log(error);
    });



    // return the map of progress.observables
    return progress.asObservable();
  }

  */

  ngOnDestroy() {
    console.log('AssetsMockApiRepository', 'ngOnDestroy AssetsMockApiRepository');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
