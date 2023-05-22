import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable()
export class CartService {

  private _cartItems: WritableSignal<CartItem[]> = signal([]);
  private _totalPrice: Signal<number> = computed(() => {
    if (!this.cartItems().length) return 0;
    return this.cartItems().reduce((previous, item) => previous += (item.amount * item.price), 0);
  });

  get cartItems(): WritableSignal<CartItem[]> {
    return this._cartItems;

  }
  get totalPrice(): Signal<number> {
    return this._totalPrice;
  }

  public addCartItems(product: Product): void {
  const cartItem = this._cartItems().find((item) => item.id === product.id);
    if (cartItem) return;

    this._cartItems.mutate((items) => items.push({ ...product, amount: 1 }));
  }

  public increment(data: CartItem): void {
    const index = this._cartItems().findIndex((el) => el.id === data.id);
    this._cartItems.mutate((items) => items[index].amount++);
  }

  public decrement(data: CartItem): void {
    const index = this._cartItems().findIndex((el) => el.id === data.id);
    this._cartItems.mutate((items) => items[index].amount > 1 ? items[index].amount-- : items.splice(index, 1));
  }
}
