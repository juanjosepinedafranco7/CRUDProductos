import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  constructor(private productService: ProductService) { }

  get products(): Product[] {
    return this.productService.getProducts();
  }

  onSelectProduct(product: Product): void {
    this.productService.setSelectedProduct(product);
  }
}
