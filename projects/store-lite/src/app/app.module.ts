import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DxBarGaugeModule } from 'devextreme-angular';
import { BsModalService, ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { SharedLibModule, UsersRepository } from 'shared-lib';
import { AppRoutingExpModule, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreLiteGuard } from './core/guards/store-lite.guard';
import { AssetsRepository } from './core/repositories/assets.repository';
import { PushRepository } from './core/repositories/push.repository';
import { StoreLitePresentation } from './core/services/store-lite.presentation';
import { StoreLiteReducers } from './core/store';
import { StatsEffects } from './core/store/effects/stats.effects';
import { BaseGetStatsUseCase } from './core/use-cases/stats/get-stats.base-usecase';
import { GetStatsUseCase } from './core/use-cases/stats/get-stats.usecase';
import { BaseUploadUseCase } from './core/use-cases/upload/base-upload.usecase';
import { UploadUseCase } from './core/use-cases/upload/upload.usecase';
// import { AssetsMockStaticRepository } from './infrastructure/data/repositories/assets-mock-static.repository';
import { AssetsMockApiRepository } from './infrastructure/data/repositories/assets-mock-api.repository';
import { DictionaryStatsMapper } from './infrastructure/data/repositories/mappers/dictionary-stats.mapper';
// import { PushMockStaticRespository } from './infrastructure/data/repositories/push/push-mock-static.repository';
import { PushMockSignalrRepository } from './infrastructure/data/repositories/push/push-mock-signalr.repository';
import { UsersMockRepository } from './infrastructure/data/repositories/users-mock-repository';
import { ErrorModalComponent } from './presentation/file-upload/error-modal/error-modal.component';
import { FileUploadComponent } from './presentation/file-upload/file-upload.component';
import { StoreLiteComponent } from './presentation/home/store-lite.component';
import { BasicBarGaugeComponent } from './presentation/shared/basic-bar-gauge/basic-bar-gauge.component';
import { BasicStatComponent } from './presentation/shared/basic-stat/basic-stat.component';
import { RadioButtonImageTextComponent } from './presentation/shared/radio-button-image-text/radio-button-image-text.component';
import { StatsComponent } from './presentation/stats/stats.component';
import { StorageComponent } from './presentation/storage/storage.component';
import { AssetsMockStaticRepository } from './infrastructure/data/repositories/assets-mock-static.repository';
import { BaseIsUploadValidUseCase } from './core/use-cases/upload/is-upload-valid.base-usecase';
import { IsUploadValidUseCase } from './core/use-cases/upload/is-upload-valid.usecase';
import { BaseCheckNumberOfFilesUseCase } from './core/use-cases/upload/check-number-files.base-usecase';
import { CheckNumberOfFilesUseCase } from './core/use-cases/upload/check-number-files.usecase';
import { FileUploadEffects } from './core/store/effects/file-upload.effects';


@NgModule({
  declarations: [
    AppComponent,
    StoreLiteComponent,
    StatsComponent,
    BasicStatComponent,
    StorageComponent,
    BasicBarGaugeComponent,
    RadioButtonImageTextComponent,
    FileUploadComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedLibModule,
    HttpClientModule,
    /*
    * The module itself track of its own state as it does this for its routes and so can fulfill the purpose
    * of a completely separated part of the application.
    * The goal is that each feature module contributes it’s own little part to the global state.
    */
    StoreModule.forRoot(StoreLiteReducers),  // TODO remove @ngrx/store: runtime checks are currently ... warning
    EffectsModule.forRoot([StatsEffects, FileUploadEffects]),

    DxBarGaugeModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ErrorModalComponent],
  providers: [
    // Repositories
    {provide: UsersRepository, useClass: UsersMockRepository},
    {provide: BaseGetStatsUseCase, useClass: GetStatsUseCase},
    {provide: BaseUploadUseCase, useClass: UploadUseCase},
    {provide: AssetsRepository, useClass: AssetsMockStaticRepository},
    {provide: PushRepository, useClass: PushMockSignalrRepository},
    {provide: BaseIsUploadValidUseCase, useClass: IsUploadValidUseCase},
    {provide: BaseCheckNumberOfFilesUseCase, useClass: CheckNumberOfFilesUseCase},

    StoreLitePresentation,
    DictionaryStatsMapper,
    StoreLiteGuard,
    BsModalService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({
  declarations: [
    // AppComponent,
    // StoreLiteComponent,
    // StatsComponent,
    // BasicStatComponent,
    // StorageComponent,
    // BasicBarGaugeComponent,
    // RadioButtonImageTextComponent,
    // FileUploadComponent
  ],
  imports: [
    CommonModule,
    AppRoutingExpModule,
    SharedLibModule,
    HttpClientModule,
    /*
    * The module itself track of its own state as it does this for its routes and so can fulfill the purpose
    * of a completely separated part of the application.
    * The goal is that each feature module contributes it’s own little part to the global state.
    */
    StoreModule.forFeature('storeLite', StoreLiteReducers), // TODO: remove @ngrx/store: runtime checks are currently ... warning
    EffectsModule.forFeature([StatsEffects]),

    FormsModule,
    ReactiveFormsModule,

    DxBarGaugeModule
  ],
  providers: [
    // Repositories
    {provide: UsersRepository, useClass: UsersMockRepository},
    {provide: BaseGetStatsUseCase, useClass: GetStatsUseCase},
    {provide: AssetsRepository, useClass: AssetsMockStaticRepository},
    {provide: PushRepository, useClass: PushMockSignalrRepository},

    StoreLitePresentation,
    DictionaryStatsMapper,
    StoreLiteGuard,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppExpModule { }
