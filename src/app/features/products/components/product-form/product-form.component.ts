import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, DoCheck {
  nombre: string = '';
  precio: number | null = null;
  isEditMode: boolean = false;
  currentProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    const activeProduct = this.productService.getSelectedProduct();
    if (activeProduct && activeProduct.id !== this.currentProductId) {
      this.nombre = activeProduct.nombre;
      this.precio = activeProduct.precio;
      this.currentProductId = activeProduct.id;
      this.isEditMode = true;
    }
  }

  isValid(): boolean {
    if (!this.nombre.trim()) return false;
    if (this.precio === null || this.precio === undefined) return false;
    if (this.precio <= 0) return false;
    return true;
  }

  onSubmit(): void {
    if (!this.isValid()) return;

    if (this.isEditMode && this.currentProductId !== null) {
      this.productService.updateProduct(this.currentProductId, this.nombre, this.precio!);
      this.resetForm();
    } else {
      this.productService.createProduct(this.nombre, this.precio!);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.nombre = '';
    this.precio = null;
    this.isEditMode = false;
    this.currentProductId = null;
    this.productService.setSelectedProduct(null);
  }
}
