import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateStockPageRoutingModule } from './update-stock-routing.module';

import { UpdateStockPage } from './update-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateStockPageRoutingModule
  ],
  declarations: [UpdateStockPage]
})
export class UpdateStockPageModule {}
