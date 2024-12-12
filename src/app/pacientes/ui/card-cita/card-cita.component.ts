import { Component, effect, inject, input } from '@angular/core';
import { CitasPacienteDetailsStateService } from '../../data-access/citas-paciente-state.service';

@Component({
  selector: 'app-card-cita',
  imports: [],
  templateUrl: './card-cita.component.html',
  styleUrl: './card-cita.component.scss',
  providers: [CitasPacienteDetailsStateService],
})
export default class CardCitaComponent {
  citasPacienteDetailState = inject(CitasPacienteDetailsStateService).state;
  id = input.required<string>();
  constructor() {
    effect(() => {
      this.citasPacienteDetailState.getCitasPaciente(this.id());
    });
  }
}
