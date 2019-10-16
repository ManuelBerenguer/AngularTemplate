import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import { IDictionary } from '../base/idictionary';
@Injectable()
export class FileUtils {


  public static ZIP_FILE_TYPE = 'zip';
  public static UPLOAD_VALID_KEY = 'isValid';
  public static UPLOAD_NUMBER_OF_FILES_VALID_KEY = 'isNumberOfFilesValid';
  public static UPLOAD_FILE_TYPES_VALID_KEY = 'isFileTypesValid';

  getFileTypes(files: FileList): IDictionary<any> {
    const result: IDictionary<any> = {};

    // const j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();

    if (files && files.length > 0) {
      Array.from(files).forEach((file, index) => {
        const extension = (file && file.name && file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '');

        result[`${ index } - ${ file.name }`] = extension.toLowerCase().trim();

        if (extension.toLowerCase().trim() === FileUtils.ZIP_FILE_TYPE) {
        // let j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();

  // typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();
        const observable$: Observable<JSZip> = from(JSZip.loadAsync(file));

        const subscription = observable$.subscribe(x => {
          x.forEach((relativePath, zipEntry) => {  // 2) print entries

                      console.log(zipEntry.name);
                    });
          }, e => console.error(e));

        }

      });
    }

    return result;
  }

  public isUploadValid(files: FileList, maxAllowedFiles: number, allowedFileTypes: string[]): IDictionary<any> {
    const result: IDictionary<any> = {};

    const numFilesOk: boolean = Array.from(files).length <= maxAllowedFiles;

    result[FileUtils.UPLOAD_NUMBER_OF_FILES_VALID_KEY] = numFilesOk;
    result[FileUtils.UPLOAD_FILE_TYPES_VALID_KEY] = true;

    result[FileUtils.UPLOAD_VALID_KEY] = numFilesOk;

    return result;
  }

}
