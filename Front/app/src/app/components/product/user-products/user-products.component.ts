import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent {
  products: Product[] = [];

  @Input() user: User = {
    id: 0,
    username: '',
    email: ''
  }

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.productService.getProductByUserID(this.user).subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();
    })
  }
}
