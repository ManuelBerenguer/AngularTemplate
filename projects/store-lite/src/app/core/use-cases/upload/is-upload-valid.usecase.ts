import { Injectable } from '@angular/core';
import { BaseIsUploadValidUseCase } from './is-upload-valid.base-usecase';
import { IDictionary, FileUtilsService } from 'shared-lib';
import { BaseCheckNumberOfFilesUseCase } from './check-number-files.base-usecase';
import { UploadChecksEnum } from '../../enums/upload-checks.enum';

@Injectable()
export class IsUploadValidUseCase extends BaseIsUploadValidUseCase {

  constructor(
    private checkNumberOfFilesUseCase: BaseCheckNumberOfFilesUseCase,
    private fileUtilsService: FileUtilsService) {
    super();
  }

  /**
   *
   * @param files HTML input file list
   * @param maxAssetsPerUpload Maximum number of files allowed to be uploaded
   *
   * @return IDictionary specifying if we can upload or not these files and why
   */
  async execute(files: FileList, maxAssetsPerUpload: number, allowedAssetsFilesTypesList: string[]): Promise<IDictionary<any>> {

    // Result Dictionary
    const result: IDictionary<any> = {};

    // We get the files as an array
    const filesArr = Array.from(files);

    // We find out if the number of files taking into account zip files fits the restriction
    const numberOfFilesCheckResult = await this.checkNumberOfFilesUseCase.execute(filesArr, maxAssetsPerUpload);

    // We set value for the key corresponding to the maximum number of files check
    result[UploadChecksEnum.UploadNumberOfFilesValid] = numberOfFilesCheckResult[0];

    // We check if the files fit the types allowed
    result[UploadChecksEnum.UploadFilesTypesValid] = this.fileUtilsService.areExtensionsAllowed(
      numberOfFilesCheckResult[1], allowedAssetsFilesTypesList);

    // The Upload is valid if both restrictions met the requirement
    result[UploadChecksEnum.UploadValid] = (
      result[UploadChecksEnum.UploadNumberOfFilesValid] &&
      result[UploadChecksEnum.UploadFilesTypesValid]
    );

    return result;
  }

}
