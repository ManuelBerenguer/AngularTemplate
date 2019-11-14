import { TestBed } from '@angular/core/testing';
import { StatsEffects } from './stats.effects';
import { BaseGetStatsUseCase } from '../../use-cases/stats/get-stats.base-usecase';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as StatsActions from '../actions/stats.actions';
import { Stats } from '../../models/stats.model';
import { cold, hot } from 'jasmine-marbles';

describe('StatsEffects', () => {
  let actions: Observable<any>;
  let effects: StatsEffects;
  let getStatsUseCase: jasmine.SpyObj<BaseGetStatsUseCase>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatsEffects,
        provideMockActions(() => actions),
        /**
         * One of the reasons we want to mock the service get() method is because we do not want to make an HTTP request.
         * In addition to that, In this case, we do not care about the method implementation; we care about the result.
         */
        {
          provide: BaseGetStatsUseCase,
          useValue: {
            execute: jasmine.createSpy()
          }
        }
      ]
    });

    effects = TestBed.get(StatsEffects);
    getStatsUseCase = TestBed.get(BaseGetStatsUseCase);

  });

  describe('getStatsAction', () => {

    it('should return the getStatsSuccessAction with the stats data inside', () => {
      const statsMock = new Stats();
      // The action that the effect is listening for
      const inAction = StatsActions.getStatsAction();
      // The action that the effect should dispatch
      const outAction = StatsActions.getStatsSuccessAction({ stats: statsMock });

      /**
       * We set the action to be dispatched by making it a hot observable that is waiting
       * for 10 frames and then emitting the action. This is used to trigger the effect under test.
       */
      actions = hot('-a', { a: inAction });
      const response = cold();
    });

  });

});
