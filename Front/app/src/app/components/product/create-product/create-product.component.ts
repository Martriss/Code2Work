import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  name = '';
  price = 0;
  description = '';

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  create() {
    this.productService.create(this.name, this.price, this.description).subscribe(() => {
      location.reload()
    })
  }

}
