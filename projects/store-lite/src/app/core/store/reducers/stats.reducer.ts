import { Action, createReducer, on } from '@ngrx/store';
import { Stats } from '../../models/stats.model';
import * as StatsActions from '../actions/stats.actions';

export interface StatsState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  stats: Stats;
  error: any;
}

export const storeLiteStatsFeatureKey = 'storelite stats';

const initialState: StatsState = {
  loading: false,
  loaded: false,
  failed: false,
  stats: null, // new Stats(),
  error: null
};

const statsReducer = createReducer(
  initialState,
  // on(StatsActions.getStatsAction, state => ({ ...state, loading: true, loaded: false, failed: false, stats: new Stats(), error: null })),
  on(StatsActions.getStatsAction, state => ({
    ...state,
    loading: true,
    loaded: false,
    failed: false,
    stats: state && state.loaded && state.loaded === true && state.stats ? {...state.stats} : new Stats(),
    // if previus state is loaded use a clone stats else new Stats() but I wanted null, but the gauge gets affected
    error: null
  })),
  on(StatsActions.getStatsSuccessAction,
    (state, { stats }) => ({ ...state, loading: false, loaded: true, failed: false, stats, error: null })
  ),
  on(StatsActions.getStatsFailedAction,
      (state, { error }) => ({ ...state, loading: false, loaded: false, failed: true, stats: null, error })
  ),
  on(StatsActions.clearStatsAction, state => ({ ...state, loading: false, loaded: false, failed: false, stats: null, error: null }))
);

export function reducer(state: StatsState | undefined, action: Action) {
  // console.log('reducer', state);
  // console.log('reducer', action);
  return statsReducer(state, action);
}
