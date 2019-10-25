import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as StatsReducer from './reducers/stats.reducer';
import * as FileUploadReducer from './reducers/file-upload.reducer';

export interface StoreLiteState {
  stats: StatsReducer.StatsState;
  uploadFiles: FileUploadReducer.FileUploadState;
}

/**
 * Mapping object to assign reducer function to each state property
 */
export const StoreLiteReducers: ActionReducerMap<StoreLiteState> = {
  stats: StatsReducer.reducer,
  uploadFiles: FileUploadReducer.reducer
};

/*export interface StoreLiteState {
    'storeLite': StoreLite
}*/

/**
 * Stats state
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


/**
 * @description
 * Upload files state.
 * We will create a selector for each significant property of the state.
 */
export const getUploadFilesState = (state: any) => state.uploadFiles === undefined ? state.storeLite.uploadFiles : state.uploadFiles;

// Since status property is an enum we will create a selector for each enum choice
export const selectUploadFilesReady = createSelector(getUploadFilesState,
  (state: FileUploadReducer.FileUploadState) => state.status === FileUploadReducer.UploadStatus.Ready);
export const selectUploadFilesChecking = createSelector(getUploadFilesState,
  (state: FileUploadReducer.FileUploadState) => state.status === FileUploadReducer.UploadStatus.Checking);
export const selectUploadFilesUploading = createSelector(getUploadFilesState,
  (state: FileUploadReducer.FileUploadState) => state.status === FileUploadReducer.UploadStatus.Uploading);
export const selectUploadFilesFailed = createSelector(getUploadFilesState,
  (state: FileUploadReducer.FileUploadState) => state.status === FileUploadReducer.UploadStatus.Failed);
export const selectUploadFilesCompleted = createSelector(getUploadFilesState,
  (state: FileUploadReducer.FileUploadState) => state.status === FileUploadReducer.UploadStatus.Completed);

export const selectUploadFilesStatus = createSelector(getUploadFilesState, (state: FileUploadReducer.FileUploadState) => state.status);
export const selectUploadFilesProgress = createSelector(getUploadFilesState, (state: FileUploadReducer.FileUploadState) => state.progress);
export const selectUploadFilesError = createSelector(getUploadFilesState, (state: FileUploadReducer.FileUploadState) => state.error);
