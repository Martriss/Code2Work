import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
  }

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  update() {
    this.productService.update(this.product.id, this.product.name, this.product.price, this.product.description).subscribe(() => {
      location.reload()
    })
  }

}
