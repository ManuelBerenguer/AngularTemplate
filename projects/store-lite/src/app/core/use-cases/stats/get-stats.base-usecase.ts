import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../../models/stats.model';

/**
 * Base class for Login use case. We will inject this class instead of a concrete class.
 * By this way we can change between different implementations easily
 * when we want.
 */
@Injectable()
export abstract class BaseGetStatsUseCase {
  abstract execute(): Observable<Stats>;
}
