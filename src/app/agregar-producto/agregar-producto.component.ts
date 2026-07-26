import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-agregar-producto',
  imports: [FormsModule],
  templateUrl: './agregar-producto.component.html'
})
export class AgregarProductoComponent {
  producto: Producto = new Producto();

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  onSubmit(): void {
    this.guardarProducto();
  }

  guardarProducto(): void {
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: () => {
        this.irListaProductos();
      },
      error: (error) => {
        console.error('Error al agregar el producto', error);
      }
    });
  }

  irListaProductos(): void {
    this.enrutador.navigate(['/productos']);
  }
}
