import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class FileUtilsService {

  constructor() {}

  public getExtension(file: File | string): string {
    if (typeof file === 'string') {
      return (file && file.indexOf('.') > 0 ? file.split('.').pop() : '').trim().toLowerCase();
    } else {
      return (file && file.name && file.name.indexOf('.') > 0 ? file.name.split('.').pop() : '').trim().toLowerCase();
    }
  }

  public async getZipFileNames(zipFile: File): Promise<string[]> {
    const result: string[] = [];
    const zip =  await JSZip.loadAsync(zipFile);

    zip.forEach((filePath: string, zipEntryObj: { dir: any; }) => {
      if (!zipEntryObj.dir) {
        result.push(filePath);
      }
    });

    return result;
  }

  public areExtensionsAllowed(fileNames: string[], allowedExtensions: string[]): boolean {
    if (fileNames && fileNames.length > 0 && allowedExtensions && allowedExtensions.length > 0) {
      const allowedExtensionsClean = allowedExtensions.filter(ext => ext && ext.trim() !== '');
      for (const fileName of fileNames) {
        if (!fileName || !allowedExtensionsClean.some(ext1 => ext1.trim().toLowerCase() === this.getExtension(fileName))) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;
  }

}
