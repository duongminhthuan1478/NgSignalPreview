import { Component, Signal, WritableSignal } from '@angular/core';
import { CartItem } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  public cartItems!: WritableSignal<CartItem[]>;

  public get totalPrice(): Signal<number> {
    return this.cartService.totalPrice;
  }

  public constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cartItems;
  }

  public increment(item: CartItem): void {
    this.cartService.increment(item);
  }

  public decrement(item: CartItem): void {
    this.cartService.decrement(item);
  }
}
