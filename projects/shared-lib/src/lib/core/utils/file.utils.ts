import { Injectable } from '@angular/core';
// import * as JSZip from 'jszip';
import { from, Observable } from 'rxjs';
import { IDictionary } from 'shared-lib/shared-lib';
@Injectable()
export class FileUtils {

  // uploadIsValid(maxNumberOfFilesAllowed: number, files: any): boolean {
  //   return true;
  // }
  public static ZIP_FILE_TYPE = 'zip';

  // getFileTypes(files: FileList): IDictionary<any> {
  //   const result: IDictionary<any> = {};

  //   // const j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();

  //   if (files && files.length > 0) {
  //     Array.from(files).forEach((file, index) => {
  //       const extension = (file && file.name && file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '');

  //       result[`${ index } - ${ file.name }`] = extension.toLowerCase().trim();

  //       if (extension.toLowerCase().trim() === FileUtils.ZIP_FILE_TYPE) {
  //         // let j: JSZip = typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();
  //         const jSZip: JSZip = new JSZip();
  // typeof ( JSZip as any).default === 'function' ? new ( JSZip as any).default() : new JSZip();
  //         const observable$: Observable<JSZip> = from(jSZip.loadAsync(file));

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

}
