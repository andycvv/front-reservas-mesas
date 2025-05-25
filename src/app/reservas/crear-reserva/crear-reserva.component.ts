import { Component, inject, OnInit } from '@angular/core';
import { TituloPrincipalComponent } from '../../compartidos/titulo-principal/titulo-principal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HorarioDTO } from '../../horarios/horarios';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MesaListadoDTO } from '../../mesas/mesas';
import { MatRadioModule } from '@angular/material/radio';
import { ReservaCreacionDTO } from '../reservas';

@Component({
  selector: 'app-crear-reserva',
  imports: [
    TituloPrincipalComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    fecha: new FormControl<Date | null>(null),
    horarioId: [0],
    cantidadDePersonas: [0]
  });

  formDatosPersonales = this.formBuilder.group({
    nombre: [''],
    telefono: [''],
    dni: ['']
  })

  mesaSeleccionadaId = new FormControl<number | null>(null);

  horarios: HorarioDTO[] = [];
  mesasDisponibles: MesaListadoDTO[] = [];

  mesaSeleccionada?: MesaListadoDTO

  ngOnInit(): void {
    this.horarios = [
      // { id: 1, horaInicio: '13:00', horaFin: '14:00', estado: true },
      // { id: 2, horaInicio: '15:00', horaFin: '16:00', estado: true },
      // { id: 3, horaInicio: '17:00', horaFin: '18:00', estado: true },
    ]

    this.mesaSeleccionadaId.valueChanges.subscribe(id => {
      this.mesaSeleccionada = this.mesasDisponibles.find(m => m.id === id);
    })

    this.formDatosPersonales.patchValue({
      dni: '78092832', nombre: 'Piero', telefono: '978676678'
    });
  }

  consultar() {
    this.mesasDisponibles = [
      { id: 1, numero: 3, capacidad: 2, estado: true, ubicacion: 'Ventana' },
      { id: 2, numero: 5, capacidad: 10, estado: true, ubicacion: 'Pared' },
      { id: 3, numero: 10, capacidad: 2, estado: false, ubicacion: 'Esquina' },
      { id: 4, numero: 7, capacidad: 8, estado: true, ubicacion: 'Centro' },
    ]
  }

  limpiar() {
    this.formDatosPersonales.patchValue({ nombre: '', dni: '', telefono: '' })
    this.mesaSeleccionadaId.patchValue(0)
    this.mesasDisponibles = [];
    this.form.patchValue({ fecha: null, cantidadDePersonas: 0, horarioId: 0 });
  }

  crearReserva() {
    const reservaACrear: ReservaCreacionDTO = {
      clienteId: 2,
      fechaDeReserva: this.form.controls.fecha.value!,
      mesaId: this.mesaSeleccionada!.id,
      horarioId: this.form.controls.horarioId.value!,
    }

    console.log(reservaACrear);
  }
}
