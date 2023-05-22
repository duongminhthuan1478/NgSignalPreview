import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBoardComponent } from './product-board/product-board.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductBoardComponent },
  { path: 'categories/:category', component: ProductBoardComponent },
  { path: 'search', component: ProductBoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
