import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent {
  productos = signal<Producto[]>([]);

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos(): void {
    this.productoServicio.obtenerProductosLista().subscribe({
      next: (datos) => {
        this.productos.set(datos);
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
      }
    });
  }

  editarProducto(id: number): void {
    this.enrutador.navigate(['editar-producto', id]);
  }
}
