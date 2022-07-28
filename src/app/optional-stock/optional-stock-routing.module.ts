import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionalStockPage } from './optional-stock.page';

const routes: Routes = [
  {
    path: '',
    component: OptionalStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionalStockPageRoutingModule {}
