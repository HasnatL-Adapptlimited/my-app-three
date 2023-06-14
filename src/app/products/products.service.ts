import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

interface ProductDTO {
  id: number;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products';

  private products = [
    {
      name: 'Webcam',
      price: 100
    },
    {
      name:  'Microphone',
      price: 200
    },
    {
      name: 'Wireless keyboard',
      price: 85
    }
  ];

  constructor(private http: HttpClient) { }

  private convertToProduct(product: ProductDTO): Product {
    return {
      id: product.id,
      name: product.title,
      price: product.price

    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDTO[]>(this.productsUrl).pipe(
      map(products => products.map(product => {
          return this.convertToProduct(product)
      }))
    );
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.productsUrl}/${id}`).pipe(
      map(product => this.convertToProduct(product))
    )
  }

}
