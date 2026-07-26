import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id!: number;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private detectorCambios = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => {
        this.producto = datos;
        this.detectorCambios.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener el producto', error);
      }
    });
  }
}
