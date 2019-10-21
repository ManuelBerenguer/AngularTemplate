import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, retry } from 'rxjs/operators';
import { BaseGetStatsUseCase } from '../../use-cases/stats/get-stats.base-usecase';
import * as StatsActions from '../actions/stats.actions';

Injectable();
export class StatsEffects {

  constructor(
    private actions$: Actions,
    private getStatsUseCase: BaseGetStatsUseCase) {
  }

  /**
   * Get Stats effect
   *
   * @description
   * This effect listen for actions of type getStatsAction and then uses switchMap to cancel the previous subscription
   * and to subscribe to the new use case call.
   * Then the effect will dispatch a new getStatsSuccessAction (or getStatsFailedAction if errors) action to update the state.
   */
  doStats$ = createEffect(() => this.actions$
   .pipe(
      ofType(StatsActions.getStatsAction),
      switchMap(action => this.executeGetStats(action)) // there must be a better way to infer the action type insted of infering any
    ));

  private executeGetStats(action: any) { // there must be a better way to infer the action type insted of infering any

    // console.log('StatsEffects Action', action);

    return this.getStatsUseCase.execute()
        .pipe(
          map(statsObj => {
            console.log('StatsEffects OK', statsObj);
            return (StatsActions.getStatsSuccessAction({ stats: statsObj }));
          }),
          catchError(errorObj => {
            console.log('StatsEffects ERROR', errorObj);
            return of(StatsActions.getStatsFailedAction({ error: errorObj }));
          })
        );
  }

}
