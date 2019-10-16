import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UsersRepository } from 'shared-lib';

@Injectable()
export class UsersMockRepository extends UsersRepository {

  isAuthenticated(): boolean {
    return true;
  }

  getAuthenticatedUser(): Observable<User> {
    const user = new User();
    user.userName = 'Manuel';
    user.clientId = 1; // 1 Elta, 2 APEC, 3 Denso
    user.userId = 1;
    user.clientName = 'Elta';

    user.usesStoreLite = true;
    user.maxAssetsPerUpload = 5;
    user.allowedAssetsFilesTypesList = ['pdf', 'zip', 'png', 'jpg', 'jpeg', 'gif', 'tiff', 'bmp'];

    return of(user);
  }

}
