import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getStats(): Observable<Stats> {

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

  ngOnDestroy() {
    console.log('AssetsMockApiRepository', 'ngOnDestroy AssetsMockApiRepository');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
