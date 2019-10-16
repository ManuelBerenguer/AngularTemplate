import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreLiteComponent } from './presentation/home/store-lite.component';
import { StoreLiteGuard } from './core/guards/store-lite.guard';

/**
 * Module definition for using it when the app module is loaded as an isolated app
 */
const routes: Routes = [
  {
    path: '',
    component: StoreLiteComponent,
    canActivate: [StoreLiteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/**
 * Module definition for using it when the app module is loaded as a feature module
 */
const expRoutes: Routes = [
  {
    path: '',
    component: StoreLiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(expRoutes)],
  exports: [RouterModule]
})
export class AppRoutingExpModule { }
