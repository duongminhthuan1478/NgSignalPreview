import { Component, Injector, Signal, WritableSignal, effect, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CartItem } from '../core/models/product.model';
import { CartService } from '../core/services/cart.service';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public searchText: WritableSignal<string | null> = signal(null);

  public get cartItems(): Signal<CartItem[]> {
    return this.cartService.cartItems.asReadonly();
  }

  public constructor(
    private cartService: CartService,
    private router: Router,
    private injector: Injector
  ) {
    effect(() => {
      toObservable(this.searchText, { injector: this.injector }).pipe(debounceTime(300))
        .subscribe((value) => {
          if (value === null) return;
          console.log("effect", value)
          this.router.navigate([`/products/search`], { queryParams: { 'q': value } });
        })
    })
  }

  public searchChange(value: string) {
    this.searchText.set(value);
  }
}
