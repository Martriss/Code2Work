import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
  }

  constructor(private productservice: ProductService) { }

  delete() {
    this.productservice.delete(this.product.id).subscribe(() => {})
  }
}
