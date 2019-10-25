import { Injectable } from "@angular/core";
import { BaseCheckNumberOfFilesUseCase } from './check-number-files.base-usecase';
import { FileUtilsService } from 'shared-lib';
import { FileTypesEnum } from '../../enums/file-types.enum';

@Injectable()
export class CheckNumberOfFilesUseCase extends BaseCheckNumberOfFilesUseCase {

  constructor(protected fileUtilsService: FileUtilsService) {
    super();
  }

  /**
   *
   * @param filesArr Array of files
   * @param maxNumberOfFiles Maximum number of files into the array
   *
   * @returns Array:
   *
   * Array[0] -> True if the total number of files into the array considering the number of files inside zip files
   * is less or equal than maxNumberOfFiles.
   * False otherwise.
   *
   * Array[1] -> array with all the file names once any of the possible zip files has been uncompressed.
   */
  async execute(filesArr: File[], maxNumberOfFiles: number): Promise<any[]> {
    // Result Dictionary
    const result: Array<any> = [];

    let numberOfFiles = 0;
    result[0] = true;
    result[1] = [];
    for (const file of filesArr) {
      if (this.fileUtilsService.getExtension(file) === FileTypesEnum.Zip) {
        const unzipResult = await this.fileUtilsService.getZipFileNames(file);
        numberOfFiles += unzipResult.length;
        result[1].push(...unzipResult);
      } else {
        result[1].push(file.name);
        numberOfFiles++;
      }

      if (numberOfFiles > maxNumberOfFiles) {
        result[0] = false;
        break;
      }
    }

    return result;
  }

}
