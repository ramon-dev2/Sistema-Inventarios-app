import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id!: number;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private enrutador = inject(Router);
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

  onSubmit(): void {
    this.guardarProducto();
  }

  guardarProducto(): void {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: () => {
        this.irProductoLista();
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
      }
    });
  }

  irProductoLista(): void {
    this.enrutador.navigate(['/productos']);
  }
}
