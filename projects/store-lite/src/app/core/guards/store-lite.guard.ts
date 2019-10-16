import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard, UsersRepository } from 'shared-lib';

@Injectable()
export class StoreLiteGuard extends AuthGuard {

  constructor(usersRepository: UsersRepository) {
      super(usersRepository);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // TODO: Do real checks for storeLite
    const storeLiteChecks = true;

    return super.canActivate(route, state) && storeLiteChecks;
  }

}
