import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersRepository } from '../repositories/user.repository';

export abstract class AuthGuard implements CanActivate {

  constructor(private usersRepository: UsersRepository) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usersRepository.isAuthenticated();
  }

}
