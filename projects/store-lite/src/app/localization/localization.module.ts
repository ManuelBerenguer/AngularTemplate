import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateDirective } from './directives/translate.directive';

/**
 *
 * @param service Dependency to initialize
 * @description Function to initialize dependencies
 */
const setupTranslationsFactory = (service: TranslateService) => {
  // By default we initialize our translations service to use english localization
  return () => service.use('es');
};

@NgModule({
  declarations: [TranslatePipe, TranslateDirective],
  imports: [
    CommonModule
  ],
  providers: [
    TranslateService,
    {
      /**
       * Callback is invoked before an app is initialized. All registered initializers can optionally return a Promise.
       * All initializer functions that return Promises must be resolved before the application is bootstrapped.
       * If one of the initializers fails to resolves, the application is not bootstrapped.
       */
      provide: APP_INITIALIZER,
      useFactory: setupTranslationsFactory,
      deps: [TranslateService],
      multi: true // To register multiple handlers for the provide event
    }
  ],
  exports: [TranslatePipe, TranslateDirective]
})
export class LocalizationModule { }
