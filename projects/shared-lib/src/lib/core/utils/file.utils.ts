import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import { IDictionary } from '../base/idictionary';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class FileUtils {

  public ZIP_FILE_TYPE = 'zip';
  public UPLOAD_VALID_KEY = 'isValid';
  public UPLOAD_NUMBER_OF_FILES_VALID_KEY = 'isNumberOfFilesValid';
  public UPLOAD_FILE_TYPES_VALID_KEY = 'isFileTypesValid';

  constructor() {}



  // public  isUploadValid(files: FileList, maxAllowedFiles: number, allowedFileTypes: string[]): IDictionary<any> {
  //   const result: IDictionary<any> = {};

  //   result[this.UPLOAD_FILE_TYPES_VALID_KEY] = false;

  //   const filesArr = Array.from(files);
  //   let numFilesOk: boolean = filesArr && filesArr.length <= maxAllowedFiles;

  //   result[this.UPLOAD_NUMBER_OF_FILES_VALID_KEY] = numFilesOk;

  //   if (numFilesOk) {
  //     let totalFiles = filesArr.length;
  //     let fileTypeOk = true;

  //     const typesArray = allowedFileTypes.filter(ext => ext).map(ext => ext.toLowerCase().trim());

  //     const anyNotValid: boolean = filesArr.map(file => this.getExtension(file)).some(ext => !typesArray.some(ext1 => ext1 === ext));

  //     if (anyNotValid) {
  //       fileTypeOk = false;
  //     } else {
  //       filesArr.filter(file => this.getExtension(file) === this.ZIP_FILE_TYPE).forEach((zipFile) => {
  //         totalFiles--;

  //         const obs$ = from(JSZip.loadAsync(zipFile));

  //         obs$.subscribe((zipContents: any) => {
  //           zipContents.forEach((zipEntry: {
  //             name: string;
  //           }) => {
  //             totalFiles++;
  //             if (!typesArray.filter(type => type !== this.ZIP_FILE_TYPE).some(type => type === this.getExtension(zipEntry))) {
  //               fileTypeOk = false;
  //             }
  //           });
  //         }, (e: any) => {
  //           console.log(e);
  //           fileTypeOk = false;
  //         });

  //         // JSZip.loadAsync(zipFile).then((zipContents: any) => {
  //         //   zipContents.forEach((zipEntry: {
  //         //     name: string;
  //         //   }) => {
  //         //     totalFiles++;
  //         //     if (!typesArray.filter(type => type !== this.ZIP_FILE_TYPE).some(type => type === this.getExtension(zipEntry))) {
  //         //       fileTypeOk = false;
  //         //     }
  //         //   });
  //         // }, (e: any) => {
  //         //   console.log(e);
  //         //   fileTypeOk = false;
  //         // });

  //         // const unZipResult = await this.unZip2(zipFile);
  //         // await unZipResult.then((zipContents: any) => {
  //         //   zipContents.forEach((zipEntry: {
  //         //     name: string;
  //         //   }) => {
  //         //     totalFiles++;
  //         //     if (!typesArray.filter(type => type !== this.ZIP_FILE_TYPE).some(type => type === this.getExtension(zipEntry))) {
  //         //       fileTypeOk = false;
  //         //     }
  //         //   });
  //         // }, (e: any) => {
  //         //   console.log(e);
  //         //   fileTypeOk = false;
  //         // });
  //         // totalFiles += unZipResult.totalFiles;
  //       });
  //     }

  //     numFilesOk = totalFiles <= maxAllowedFiles;

  //     result[this.UPLOAD_FILE_TYPES_VALID_KEY] = fileTypeOk;
  //     result[this.UPLOAD_VALID_KEY] = numFilesOk && fileTypeOk;
  //   }

  //   return result;
  // }

  private getExtension(file: File): string {
    return (file && file.name && file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '').trim().toLowerCase();
  }

  public async unZip(zipFile: File): Promise<string[]> {

    const result: string[] = [];

    const zip =  await JSZip.loadAsync(zipFile);

    zip.forEach((filePath: string, zipEntryObj: { dir: any; }) => {

      if (!zipEntryObj.dir) {
        result.push(filePath);
      }

    });

    return result;
  }

}
