import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetLinkTypeEnum } from '../../enums/asset-link-type.enum';
import { UploadProgress } from '../../models/upload-progress.model';

/**
 * Base class for Login use case. We will inject this class instead of a concrete class.
 * By this way we can change between different implementations easily
 * when we want.
 */
@Injectable()
export abstract class BaseUploadUseCase {
  abstract execute(files: FileList, mode: AssetLinkTypeEnum): Observable<UploadProgress>;
}
