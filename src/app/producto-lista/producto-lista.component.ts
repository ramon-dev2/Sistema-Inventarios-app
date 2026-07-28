import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent {
  productos = signal<Producto[]>([]);
  filtro = signal('');
  productosFiltrados = computed(() => {
    const texto = this.filtro().trim().toLowerCase();

    if (!texto) {
      return this.productos();
    }

    return this.productos().filter((producto) =>
      [
        producto.idProducto,
        producto.descripcion,
        producto.precio,
        producto.existencia,
        producto.activo ? 'sí activo' : 'no inactivo'
      ].some((valor) => String(valor).toLowerCase().includes(texto))
    );
  });

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

  irAgregarProducto(): void {
    this.enrutador.navigate(['/agregar-producto']);
  }

  actualizarFiltro(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    this.filtro.set(campo.value);
  }

  eliminarProducto(id: number): void {
    this.productoServicio.eliminarProducto(id).subscribe({
      next: () => {
        this.obtenerProductos();
      },
      error: (error) => {
        console.error('Error al eliminar el producto', error);
      }
    });
  }
}
