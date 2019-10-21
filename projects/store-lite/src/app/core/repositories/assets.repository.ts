import { Observable } from 'rxjs';
import { Stats } from '../models/stats.model';

/**
 * Abstract repository. We will inject this class into the usecases or services for retrieving data instead of injecting concrete classes.
 * By this way we change between different implementations easily. For example, we can use a mock repository implementation on development
 * environment and an API repository implementation on production environment.
 */
export abstract class AssetsRepository {
  abstract getStats(): Observable<Stats>;
  abstract uploadAssets(files: FileList): Observable<any>;
}
