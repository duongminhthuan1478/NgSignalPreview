import { Component, Injector, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products-w-signal',
  templateUrl: './products-w-signal.component.html',
  styleUrls: ['./products-w-signal.component.scss']
})
export class ProductsWSignalComponent {
  public products!: Signal<Product[]>;
  public product: Signal<Product | null> = signal(null);

  public constructor(
    private productService: ProductService,
    private cartService: CartService,
    private injector: Injector,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getProducts();
  }

  public addToCart(product: Product): void {
    this.cartService.addCartItems(product)
  }

  public viewDetail(product: Product): void {
    this.product = toSignal<Product, null>(
      this.productService.gerProduct(product.id), { initialValue: null, injector: this.injector }
    );
  }

  private getProducts(): void {
    const url = this.router.url;
    if (url.includes('/products/search')) {
      this.searchWithProducts();
      return
    }
    this.getProductsWithCategory();
  }

  private getProductsWithCategory(): void {
    const ob$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const category = params['category'];
        if (category) {
          return this.productService.getProductsWithCategory(category);
        }
        return this.productService.getProducts();
      }),
    );
    this.products = toSignal<Product[], Product[]>(ob$, { initialValue: [] })
  }


  private searchWithProducts(): void {
    const ob$ = this.activatedRoute.queryParams.pipe(
      switchMap((query) => {
        const search = query['q'];
        if (search) {
          return this.productService.searchProduct(search);
        }
        return this.productService.getProducts();
      })
    );
    this.products = toSignal<Product[], Product[]>(ob$, { initialValue: [] })
  }
}
