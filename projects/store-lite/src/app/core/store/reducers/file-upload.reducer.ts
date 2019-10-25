import { createReducer, on, Action } from '@ngrx/store';
import * as FileUploadActions from '../actions/file-upload.actions';

/**
 * Enum representing the different process states
 */
export enum UploadStatus {
  Ready = 'Ready', // Ready to upload new files
  Checking = 'Checking', // doing checks before start uploading
  Uploading = 'Uploading', // sending files to server
  Failed = 'Failed', // error checking or sending files to server
  Completed = 'Completed' // files successfully sent to the server
}

export interface FileUploadState {
  status: UploadStatus; // current process state
  error: any | null; // error message received from server
  progress: number | null; // Percentage of uploading progression
}

export const storeLiteFileUploadFeatureKey = 'storelite assets upload';

/**
 * @description the initial state of the upload process
 */
const initialState: FileUploadState = {
  status: UploadStatus.Ready,
  error: null,
  progress: null
};

/**
 * @description Manage the state transitions for the different actions
 */
const fileUploadReducer = createReducer(
  initialState,
  on(FileUploadActions.getDoChecksAction, state => ({
    ...state, status: UploadStatus.Checking, error: null, progress: null
  })),
  on(FileUploadActions.getUploadAction, state => ({
    ...state, status: UploadStatus.Uploading, error: null, progress: 0
  })),
  on(FileUploadActions.getUpdateProgressAction, (state, { percentage }) => ({
    ...state, status: UploadStatus.Uploading, error: null, progress: percentage
  })),
  on(FileUploadActions.getUploadSuccessAction, state => ({
    ...state, status: UploadStatus.Completed, error: null, progress: 100
  })),
  on(FileUploadActions.getUploadFailedAction, (state, { error }) => ({
    ...state, status: UploadStatus.Failed, error, progress: null
  })),
  on(FileUploadActions.getReadyAction, state => ({
    ...state, status: UploadStatus.Ready, error: null, progress: null
  }))
);

export function reducer(state: FileUploadState | undefined, action: Action) {
  return fileUploadReducer(state, action);
}
