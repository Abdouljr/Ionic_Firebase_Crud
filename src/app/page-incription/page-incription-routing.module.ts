import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageIncriptionPage } from './page-incription.page';

const routes: Routes = [
  {
    path: '',
    component: PageIncriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageIncriptionPageRoutingModule {}
