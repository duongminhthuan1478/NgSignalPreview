import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ProductBoardComponent } from './product-board/product-board.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsWSignalComponent } from './products-w-signal/products-w-signal.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsWSignalComponent,
    ProductBoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ],
})
export class ProductModule { }
