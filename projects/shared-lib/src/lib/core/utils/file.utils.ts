import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import { IDictionary } from '../base/idictionary';
@Injectable({
  providedIn: 'root'
})
export class FileUtils {


  public ZIP_FILE_TYPE = 'zip';
  public UPLOAD_VALID_KEY = 'isValid';
  public UPLOAD_NUMBER_OF_FILES_VALID_KEY = 'isNumberOfFilesValid';
  public UPLOAD_FILE_TYPES_VALID_KEY = 'isFileTypesValid';

  constructor(){}

  // getFileTypes(files: FileList): IDictionary<any> {
  //   const result: IDictionary<any> = {};

  //   // const j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();

  //   if (files && files.length > 0) {
  //     Array.from(files).forEach((file, index) => {
  //       const extension = (file && file.name && file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '');

  //       result[`${ index } - ${ file.name }`] = extension.toLowerCase().trim();

  //       if (extension.toLowerCase().trim() === FileUtils.ZIP_FILE_TYPE) {
  //         let j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();
  //          //const jSZip: JSZip = new JSZip();
  // // typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();
  //         const observable$: Observable<JSZip> = from(JSZip.loadAsync(file));

  //         const subscription = observable$.subscribe(x => {
  //           x.forEach(function(relativePath, zipEntry) {  // 2) print entries

  //                       console.log(zipEntry.name);
  //                     });
  //           }, e => console.error(e));

  //       }

  //     });
  //   }

  //   return result;
  // }

  public isUploadValid(files: FileList, maxAllowedFiles: number, allowedFileTypes: string[]): IDictionary<any> {
    const result: IDictionary<any> = {};

    const numFilesOk: boolean = Array.from(files).length <= maxAllowedFiles;

    result[this.UPLOAD_NUMBER_OF_FILES_VALID_KEY] = numFilesOk;
    result[this.UPLOAD_FILE_TYPES_VALID_KEY] = true;

    result[this.UPLOAD_VALID_KEY] = numFilesOk;

    return result;
  }

}
