import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    /** StoreLite established as /storelite route and it's Lazy Loaded. */
    path: 'storelite',
    loadChildren: () => import('../../../../projects/store-lite/src/app/app.module').then(m => m.AppExpModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
