import { createAction, props } from '@ngrx/store';
import { Stats } from '../../models/stats.model';

/* Enum with all possible action types with a text to display them in logs, ...*/
enum StatsActionTypes {
  GET_STATS = '[StoreLite Stats] GetStats',
  GET_STATS_SUCCESS = '[StoreLite Stats] GetStatsSuccess',
  GET_STATS_FAILED = '[StoreLite Stats] GetStatsFailed',
  CLEAR_STATS = '[StoreLite Stats] GetStatsFailed'
}

export const getStatsAction = createAction(StatsActionTypes.GET_STATS);
export const getStatsSuccessAction = createAction(StatsActionTypes.GET_STATS_SUCCESS, props<{ stats: Stats; }>());
export const getStatsFailedAction = createAction(StatsActionTypes.GET_STATS_FAILED, props<{ error: any; }>());
export const clearStatsAction = createAction(StatsActionTypes.CLEAR_STATS);


