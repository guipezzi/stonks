import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateStockPage } from './update-stock.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStockPageRoutingModule {}
