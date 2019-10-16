import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../../models/stats.model';
import { AssetsRepository } from '../../repositories/assets.repository';
import { BaseGetStatsUseCase } from './get-stats.base-usecase';

@Injectable()
export class GetStatsUseCase extends BaseGetStatsUseCase {

  constructor(private assetsRepository: AssetsRepository) {
    super();
  }

  execute(): Observable<Stats> {
    return this.assetsRepository.getStats();
  }

}
