import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as StatsReducer from './reducers/stats.reducer';

export interface StoreLiteState {
  stats: StatsReducer.StatsState;
}

/**
 * Mapping object to assign reducer function to each state property
 */
export const StoreLiteReducers: ActionReducerMap<StoreLiteState> = {
  stats: StatsReducer.reducer
};

/*export interface StoreLiteState {
    'storeLite': StoreLite
}*/

/**
 * Stats store selectors
 */
// If we run StoreLite feature application isolated the type we receive for Store is different
// than the type we would receive if we run StoreLite as a child application inside ONCE
export const getStatsState = (state: any) => state.stats === undefined ? state.storeLite.stats : state.stats;

// define Selectors
export const selectStats = createSelector(getStatsState, (state: StatsReducer.StatsState) => state.stats);
export const selectStatsLoading = createSelector(getStatsState, (state: StatsReducer.StatsState) => state.loading);
export const selectStatsLoaded = createSelector(getStatsState, (state: StatsReducer.StatsState) => state.loaded);
export const selectStatsFailed = createSelector(getStatsState, (state: StatsReducer.StatsState) => state.failed);
export const selectError = createSelector(getStatsState, (state: StatsReducer.StatsState) => state.error);
