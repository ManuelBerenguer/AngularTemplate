import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as FileUploadActions from '../actions/file-upload.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { BaseIsUploadValidUseCase } from '../../use-cases/upload/is-upload-valid.base-usecase';
import { from, of } from 'rxjs';
import { UploadChecksEnum } from '../../enums/upload-checks.enum';
import { UploadErrorTypes } from '../../enums/upload-error-types.enum';
import { BaseUploadUseCase } from '../../use-cases/upload/base-upload.usecase';
import { AssetLinkTypeEnum } from '../../enums/asset-link-type.enum';
import { UploadProgress } from '../../models/upload-progress.model';

Injectable();
export class FileUploadEffects {

  constructor(
    private actions$: Actions,
    private isUploadValidUseCase: BaseIsUploadValidUseCase,
    private uploadUseCase: BaseUploadUseCase
  ) {}

  /**
   * @description
   * This effect listen for actions of type UPLOAD_FAILED and dispatch a READY action to allow user to upload
   * files again after any error
   */
  uploadFailedEffect$ = createEffect(() => this.actions$.pipe(
    ofType(FileUploadActions.getUploadFailedAction),
    map(action => (FileUploadActions.getReadyAction())
  )));

  /**
   * @description
   * This effect listen for actions of type DO_CHECKS and then uses switchMap to cancel the previous subscription
   * and to subscribe to the new use case call.
   */
  doChecksEffect$ = createEffect(() => this.actions$.pipe(
    ofType(FileUploadActions.getDoChecksAction),
    switchMap(action => this.doChecks(action.files, action.maxNumberOfFiles, action.fileTypesList, action.mode))
  ));

  /**
   * @description
   * This effect listen for actions of type UPLOAD and then uses switchMap to cancel the previous subscription
   * and to subscribe to the new use case call.
   */
  uploadEffect$ = createEffect(() => this.actions$.pipe(
    ofType(FileUploadActions.getUploadAction),
    switchMap(action => this.upload(action.files, action.mode))
  ));

  /**
   * @description
   * This effect listen for actions of type UPLOAD_SUCCESS and dispatch a READY action to allow user to upload
   * files again after any error
   */
  uploadSuccessEffect$ = createEffect(() => this.actions$.pipe(
    ofType(FileUploadActions.getUploadSuccessAction),
    map(action => (FileUploadActions.getReadyAction())
  )));

  private upload(fileList: FileList, mode: AssetLinkTypeEnum) {

    // We call the use case responsible for uploading the files and we get an observable
    const uploadprogress$ = this.uploadUseCase.execute(fileList, mode);

    return uploadprogress$.pipe(
      map( (uploadProgress: UploadProgress) => {
        // If the upload process has completed
        if (uploadProgress.completed) {
          // If completed successfully
          if (uploadProgress.success) {
            // We dispatch upload success action
            return (FileUploadActions.getUploadSuccessAction());
          } else {
            // We dispatch upload failed action indicating api error
            return (FileUploadActions.getUploadFailedAction({error: { type: UploadErrorTypes.ApiError } }));
          }
        } else {
          // We dispatch action to update the progress
          return (FileUploadActions.getUpdateProgressAction({ percentage: uploadProgress.progress }));
        }
      })
    );
  }

  private doChecks(fileList: FileList, maxNumberOfFiles: number, fileTypesList: string[], mode: AssetLinkTypeEnum) {

    // we convert the promise returned by the use case to an observable
    const checksResult$ = from(this.isUploadValidUseCase.execute(fileList, maxNumberOfFiles, fileTypesList));

    // We subscribe to the observable and we return an action in function of the checks result
    return checksResult$.pipe(
      map(checksResult => {
        if (checksResult[UploadChecksEnum.UploadValid]) {
          return (FileUploadActions.getUploadAction({files: fileList, mode}));
        } else {

          let errorType: UploadErrorTypes = UploadErrorTypes.FileTypesNotAllowed;
          if (!checksResult[UploadChecksEnum.UploadNumberOfFilesValid]) {
            errorType = UploadErrorTypes.MaxNumberOfFiles;
          }

          return (FileUploadActions.getUploadFailedAction({error: { type: errorType } }));
        }
      }),
      catchError(errorObj => {
        return of(FileUploadActions.getUploadFailedAction({error: { type: UploadErrorTypes.ApiError } }));
      })
    );
  }
}
