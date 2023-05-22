import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  private readonly _baseUrl = 'https://dummyjson.com';
  private readonly _searchText$: Subject<string> = new Subject<string>();

  get searchText$(): Observable<string> {
    return this._searchText$.asObservable();
  }

  public constructor(private http: HttpClient) { }

  public setSearchText$(text: string): void {
    this._searchText$.next(text);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(this._baseUrl + '/products?limit=5')
      .pipe(map(data => data?.products));
  }

  public getProductsWithCategory(category: string) {
    return this.http.get<any>(this._baseUrl + `/products/category/${category}?limit=5`)
      .pipe(map(data => data.products));
  }

  public searchProduct(searchText: string): Observable<Product[]> {
    return this.http.get<any>(this._baseUrl + `/products/search?q=${searchText}`)
      .pipe(map(data => {
        return data.products.length > 5 ? data.products.slice(0, 5) : data.products
      }));
  }

  public gerProduct(id: number): Observable<Product> {
    return this.http.get<any>(this._baseUrl + '/products/' + id);
  }
}
