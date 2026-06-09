interface Product {
  id: number;
  nombre: string;
  precio: number;
}

export class ProductService {
  private products: Product[] = [];
  private nextId: number = 1;
  private selectedProduct: Product | null = null;

  getProducts(): Product[] {
    return this.products;
  }

  createProduct(nombre: string, precio: number): void {
    const newProduct: Product = {
      id: this.nextId++,
      nombre,
      precio
    };
    this.products.push(newProduct);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    if (this.selectedProduct && this.selectedProduct.id === id) {
      this.selectedProduct = null;
    }
  }

  setSelectedProduct(product: Product | null): void {
    this.selectedProduct = product ? { ...product } : null;
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }

  updateProduct(id: number, nombre: string, precio: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { id, nombre, precio };
      this.selectedProduct = null;
    }
  }
}
