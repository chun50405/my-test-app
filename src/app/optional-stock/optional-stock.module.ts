import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionalStockPageRoutingModule } from './optional-stock-routing.module';

import { OptionalStockPage } from './optional-stock.page';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionalStockPageRoutingModule,
    ScrollingModule
  ],
  declarations: [OptionalStockPage]
})
export class OptionalStockPageModule {}
