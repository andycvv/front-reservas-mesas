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
import { HorariosService } from '../../horarios/horarios.service';
import { MesasService } from '../../mesas/mesas.service';
import { ReservasService } from '../reservas.service';
import { LoadingComponent } from "../../compartidos/loading/loading.component";
import { AuthService } from '../../auth/auth.service';

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
    MatRadioModule,
    LoadingComponent
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private horariosService = inject(HorariosService);
  private mesasService = inject(MesasService);
  private reservasService = inject(ReservasService);
  private authService= inject(AuthService);

  public minFecha: Date = new Date();
  public cargando = false;

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
    this.minFecha.setDate(this.minFecha.getDate() + 1);
    
    this.horariosService.obtenerTodosActivos().subscribe(horarios => {
      this.horarios = horarios;
    })

    this.mesaSeleccionadaId.valueChanges.subscribe(id => {
      this.mesaSeleccionada = this.mesasDisponibles.find(m => m.id === id);
    })

    this.formDatosPersonales.patchValue({
      dni: this.authService.getDni()
    });
  }

  consultar() {
    const { fecha, cantidadDePersonas, horarioId } = this.form.value

    if (fecha && cantidadDePersonas && horarioId) {
      this.mesaSeleccionadaId.patchValue(null);
      this.mesaSeleccionada = undefined;
      this.cargando = true;

      const fechaFormateada = fecha.toISOString().split('T')[0];
      this.mesasService.obtenerTodosDisponibles(fechaFormateada, horarioId, cantidadDePersonas)
        .subscribe(mesas => {
          this.mesasDisponibles = mesas;
          this.cargando = false;
        })
    }
  }

  limpiar() {
    this.mesaSeleccionadaId.patchValue(0)
    this.mesasDisponibles = [];
    this.form.patchValue({ fecha: null, cantidadDePersonas: 0, horarioId: 0 });
  }

  crearReserva() {
    const reservaACrear: ReservaCreacionDTO = {
      clienteId: 2,
      fecha: this.form.controls.fecha.value!,
      mesaId: this.mesaSeleccionada!.id,
      horarioId: this.form.controls.horarioId.value!,
    }

    this.reservasService.crear(reservaACrear).subscribe(() => {
      this.limpiar();
    })
  }
}
