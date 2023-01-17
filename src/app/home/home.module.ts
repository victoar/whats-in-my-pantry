import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {ProductCardComponent} from "../product-card/product-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports: [
    ProductCardComponent
  ],
  declarations: [HomePage, ProductCardComponent]
})
export class HomePageModule {}
