import { Component, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from "../../compartidos/titulo-principal/titulo-principal.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HorarioDTO } from '../horarios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado-horarios',
  imports: [
    TituloPrincipalComponent, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink,
    DatePipe
  ],
  templateUrl: './listado-horarios.component.html',
  styleUrl: './listado-horarios.component.css'
})
export class ListadoHorariosComponent implements OnInit{

  horarios: HorarioDTO[] = []
  
  ngOnInit(): void {
    this.horarios = [
      {id: 1, horaDeInicio: '10:30', horaDeFin: '11:30', estado: true},
      {id: 2, horaDeInicio: '14:00', horaDeFin: '15:00', estado: true},
      {id: 3, horaDeInicio: '12:00', horaDeFin: '13:00', estado: true},
      {id: 4, horaDeInicio: '16:30', horaDeFin: '17:30', estado: true},
      {id: 5, horaDeInicio: '18:00', horaDeFin: '19:00', estado: true},
    ]
  }
}
