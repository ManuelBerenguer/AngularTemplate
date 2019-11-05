import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as StatsActions from '../actions/stats.actions';
import * as StatsReducer from '../reducers/stats.reducer';
import { Actions } from '@ngrx/effects';
import { Stats } from '../../models/stats.model';

describe('StatsReducer', () => {

  describe('undefined action', () => {
    it('should return the same state', () => {
      // We destructure initialState from StatsReducer
      const { initialState } = StatsReducer;
      const action = {type: undefined};
      const state = StatsReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('GET_STATS action', () => {
    it('should set status to Loading', () => {
      // We destructure initialState from StatsReducer
      const { initialState } = StatsReducer;
      const state = StatsReducer.reducer(initialState, StatsActions.getStatsAction);

      expect(state.status).toEqual(StatsReducer.StatsStatus.Loading);
      expect(state.error).toBeNull();
      expect(state.stats).toBeNull();
    });
  });

  describe ('GET_STATS_SUCCESS action', () => {
    it('should populate stats', () => {
      const stats = new Stats();
      stats.totalNotLive = 20;

      const { initialState } = StatsReducer;
      const state = StatsReducer.reducer(initialState, StatsActions.getStatsSuccessAction({stats}));

      expect(state.status).toEqual(StatsReducer.StatsStatus.Loaded);
      expect(state.stats).toEqual(stats);
    });
  });

});
