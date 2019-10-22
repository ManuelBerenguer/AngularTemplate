import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { PushRepository } from 'projects/store-lite/src/app/core/repositories/push.repository';
import { Subscription } from 'rxjs';
import { IDictionary, User, UsersRepository } from 'shared-lib';
import { DictionaryStatsMapper } from '../mappers/dictionary-stats.mapper';


@Injectable()
export class PushMockSignalrRepository extends PushRepository implements OnDestroy {

  private hubConnection: signalR.HubConnection;
  private loggedUser$ = this.usersRepository.getAuthenticatedUser();
  private user: User;
  private subscriptions: Array<Subscription> = [];

  private storeLiteHubURL = 'https://localhost:44337/StoreLiteHub';
  // 'https://storelitetest.azurewebsites.net/StoreLiteHub';
  // 'https://localhost:44337/StoreLiteHub';

  constructor(private statsMapper: DictionaryStatsMapper, protected usersRepository: UsersRepository) {
    super();

    this.registerSubscriptions();

    const accessToken = `${this.user.clientId}-${this.user.userId}-${this.user.userName}-${this.user.clientName}`;
    console.log(accessToken);

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.storeLiteHubURL, {
        accessTokenFactory: () => accessToken
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('PushMockSignalrRepository', 'Connection started'))
      .catch(err => console.log('PushMockSignalrRepository', 'Error while starting connection: ' + err));

    this.hubConnection.on('PushStats', (data: IDictionary<any>) => {
      this.stats$.next(this.statsMapper.mapTo(data));
      console.log('PushStats', data);
    });

    this.hubConnection.on('PushStatsChangedNotification', (signalData: string) => {
      this.signalData$.next(signalData);
      console.log('PushStatsChangedNotification', signalData);
    });
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
    console.log('ngOnDestroy PushMockSignalrRepository');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
