import { NgModule, APP_INITIALIZER, Injectable, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, DEFAULT_LANG, BASE_PATH } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateDirective } from './directives/translate.directive';
import { ModuleWithProviders } from '@angular/compiler/src/core';

/**
 * @description interface for configuration object for Localization module
 */
export interface LocalizationModuleConfig {
  defaultLang: string;
  basePath: string;
}

@NgModule({
  declarations: [TranslatePipe, TranslateDirective],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, TranslateDirective]
})
export class LocalizationModule {

  static forRoot(config: LocalizationModuleConfig): ModuleWithProviders {
    return {
      ngModule: LocalizationModule,
      providers: [
        TranslateService,
        {
          provide: DEFAULT_LANG,
          useValue: config.defaultLang
        },
        {
          provide: BASE_PATH,
          useValue: config.basePath
        }
      ]
    };
  }

  static forChild(config: LocalizationModuleConfig): ModuleWithProviders {
    return {
      ngModule: LocalizationModule,
      providers: [
        TranslateService,
        {
          provide: DEFAULT_LANG,
          useValue: config.defaultLang
        },
        {
          provide: BASE_PATH,
          useValue: config.basePath
        }
      ]
    };
  }

}
