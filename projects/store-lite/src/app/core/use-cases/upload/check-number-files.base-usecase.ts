import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseCheckNumberOfFilesUseCase {
  abstract async execute(filesArr: Array<File>, maxNumberOfFiles: number): Promise<Array<any>>;
}
