import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetLinkTypeEnum } from '../../enums/asset-link-type.enum';
import { UploadProgress } from '../../models/upload-progress.model';
import { AssetsRepository } from '../../repositories/assets.repository';
import { BaseUploadUseCase } from './base-upload.usecase';

@Injectable()
export class UploadUseCase extends BaseUploadUseCase {

  constructor(private assetsRepository: AssetsRepository) {
    super();
  }

  execute(files: FileList, mode: AssetLinkTypeEnum): Observable<UploadProgress> {
    return this.assetsRepository.uploadAssets(files, mode);
  }

}
