import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CartService } from 'src/core/services/cart.service';
import { ProductService } from '../core/services/product.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesModule } from './categories/categories.module';

@NgModule({
  declarations: [AppComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CategoriesModule,
    ReactiveFormsModule,
  ],
  providers: [CartService, ProductService],
  bootstrap: [AppComponent],
})
export class AppModule { }
