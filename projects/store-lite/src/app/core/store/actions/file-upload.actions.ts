import { createAction, props } from '@ngrx/store';
import { AssetLinkTypeEnum } from '../../enums/asset-link-type.enum';

/**
 * @description Enum with all possible action types with a text to display them
 */

enum FileUploadActionTypes {
  DO_CHECKS = '[StoreLite FileUpload] DoChecks',
  UPLOAD = '[StoreLite FileUpload] Upload',
  UPDATE_PROGRESS = '[StoreLite FileUpload] UpdateProgress',
  UPLOAD_SUCCESS = '[StoreLite FileUpload] UploadSuccess',
  UPLOAD_FAILED = '[StoreLite FileUpload] UploadFailed',
  READY = '[StoreLite FileUpload] Ready' // To clear state when needed (logout??)
}

/**
 * Selector for the different actions
 */
export const getDoChecksAction = createAction(FileUploadActionTypes.DO_CHECKS, props<{ files: FileList,
  maxNumberOfFiles: number, fileTypesList: string[], mode: AssetLinkTypeEnum }>());
export const getUploadAction = createAction(FileUploadActionTypes.UPLOAD, props<{ files: FileList, mode: AssetLinkTypeEnum }>());
export const getUpdateProgressAction = createAction(FileUploadActionTypes.UPDATE_PROGRESS, props<{ percentage: number }>());
export const getUploadSuccessAction = createAction(FileUploadActionTypes.UPLOAD_SUCCESS);
export const getUploadFailedAction = createAction(FileUploadActionTypes.UPLOAD_FAILED, props<{ error: any; }>());
export const getReadyAction = createAction(FileUploadActionTypes.READY);
