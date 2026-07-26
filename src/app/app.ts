import { Component } from '@angular/core';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';

@Component({
  selector: 'app-root',
  imports: [ProductoListaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'inventario-app';
}
