import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MesaListadoDTO } from '../mesas';
import { MesasService } from '../mesas.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-listado-mesas',
  imports: [
    TituloPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SweetAlert2Module
  ],
  templateUrl: './listado-mesas.component.html',
  styleUrl: './listado-mesas.component.css',
})
export class ListadoMesasComponent implements OnInit{
  private mesasService = inject(MesasService)

  mesas: MesaListadoDTO[] = [];

  ngOnInit(): void {
    this.actualizarListado()
  }

  actualizarListado() {
    this.mesasService.obtenerTodos().subscribe((mesas) => {
      this.mesas = mesas
    })
  }

  eliminar(id: number) {
    this.mesasService.eliminar(id).subscribe(() => {this.actualizarListado()})
  }
  
}
