import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Abstract repository.
 * The feature apps know that the main app will give an implementation for this contract.
 * By this way we decouple each feature app from the main one.
 */
export abstract class UsersRepository {
  abstract getAuthenticatedUser(): Observable<User>;

  abstract isAuthenticated(): boolean;
}
