import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public product!: Product | null;

  public constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getProducts();
  }

  public addToCart(product: Product): void {
    this.cartService.addCartItems(product)
  }

  public viewDetail(product: Product): void {
    this.product = null;
    this.productService.gerProduct(product.id).subscribe(data => {
      this.product = data;
    })
  }

  private getProducts(): void {
    const url = this.router.url;
    if (url.includes('/products/search')) {
      this.searchWithProducts();
      return
    }
    this.getProductsWithCategory();
  }

  private searchWithProducts(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap((query) => {
        const search = query['q'];
        if (search) {
          return this.productService.searchProduct(search);
        }
        return this.productService.getProducts();
      })
    ).subscribe((data) => {
      this.products = data;
    });
  }

  private getProductsWithCategory(): void {
    this.activatedRoute.params.pipe(
      switchMap((params) => {
        const category = params['category'];
        if (category) {
          return this.productService.getProductsWithCategory(category)
        }
        return this.productService.getProducts();
      })
    ).subscribe(data => {
      this.products = data;
    });
  }
}
