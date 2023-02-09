import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environment/evironment';

interface Response {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.url}/products`)
  }

  getProductByID(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`)
  }

  getProductByUserID(user: User) {
    return this.http.get<Product[]>(`${this.url}/users/${user.id}/products`)
  }

  create(name: string, price: number, description: string) {
    console.log(name, price, description)
    return this.http.post<Response>(`${this.url}/products`, {name: name, price: price, description: description})
  }  
  
  update(id: number, name: string, price: number, description: string) {
    return this.http.put<Response>(`${this.url}/products/${id}`, {name: name, price: price, description: description})
  }

  delete(id: number) {
    return this.http.delete<Response>(`${this.url}/products/${id}`)
  }

}
