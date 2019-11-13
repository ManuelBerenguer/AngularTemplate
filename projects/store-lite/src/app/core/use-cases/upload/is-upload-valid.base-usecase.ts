import { Injectable } from '@angular/core';
import { IDictionary } from 'shared-lib';

@Injectable()
export abstract class BaseIsUploadValidUseCase {
  abstract async execute(files: FileList, maxAssetsPerUpload: number, allowedAssetsFilesTypesList: string[]): Promise<IDictionary<any>>;
}
