import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-principal',
  imports: [],
  templateUrl: './titulo-principal.component.html',
  styleUrl: './titulo-principal.component.css'
})
export class TituloPrincipalComponent {

  @Input()
  titulo!: string;
  @Input()
  parrafo!: string;
}
