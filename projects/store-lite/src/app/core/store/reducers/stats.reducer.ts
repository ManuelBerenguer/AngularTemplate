import { Action, createReducer, on } from '@ngrx/store';
import { Stats } from '../../models/stats.model';
import * as StatsActions from '../actions/stats.actions';

/**
 * Enum representing the different process states
 */
export enum StatsStatus {
  Ready = 'Ready', // Ready to start getting the stats from server
  Loading = 'Loading', // Loading stats from server
  Loaded = 'Loaded', // Stats loaded successfully
  Error = 'Error', // An error occurred while retrieving stats from server
}

export interface StatsState {
  status: StatsStatus;
  stats: Stats;
  error: any | null;
}

export const storeLiteStatsFeatureKey = 'storelite stats';

export const initialState: StatsState = {
  status: StatsStatus.Ready,
  stats: null,
  error: null
};

const statsReducer = createReducer(
  initialState,
  // on(StatsActions.getStatsAction, state => ({ ...state, loading: true, loaded: false, failed: false, stats: new Stats(), error: null })),
  on(StatsActions.getStatsAction, state => ({
    ...state,
    status: StatsStatus.Loading,
    // if previus state has stats we clone it
    stats: state.stats ? {...state.stats} : null,
    error: null
  })),
  on(StatsActions.getStatsSuccessAction,
    (state, { stats }) => ({
      ...state,
      status: StatsStatus.Loaded, stats, error: null })
  ),
  on(StatsActions.getStatsFailedAction,
    (state, { error }) => ({ ...state,
      status: StatsStatus.Error, stats: null, error })
  ),
  on(StatsActions.getClearStatsAction, state => ({
    ...state,
    status: StatsStatus.Ready, stats: null, error: null })
  ),
  on(StatsActions.getReadyStatsAction, state => ({
    ...state,
    status: StatsStatus.Ready,
    stats: state.stats ? {...state.stats} : null,
    error: null
  }))
);

export function reducer(state: StatsState | undefined | undefined, action: Action) {
  return statsReducer(state, action);
}
