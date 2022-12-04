import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageIncriptionPageRoutingModule } from './page-incription-routing.module';

import { PageIncriptionPage } from './page-incription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageIncriptionPageRoutingModule
  ],
  declarations: [PageIncriptionPage]
})
export class PageIncriptionPageModule {}
