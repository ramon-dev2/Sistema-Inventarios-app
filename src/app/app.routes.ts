import { Routes } from '@angular/router';

import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductoListaComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent }
];
