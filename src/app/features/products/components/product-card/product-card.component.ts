import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService) { }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.productService.deleteProduct(this.product.id);
  }
}
