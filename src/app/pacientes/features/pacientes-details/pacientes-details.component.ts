import { Component, effect, inject, input } from '@angular/core';
import { PacienteDetailsStateService } from '../../data-access/paciente-state-details.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pacientes-details',
  imports: [RouterLink],
  templateUrl: './pacientes-details.component.html',
  providers: [PacienteDetailsStateService],
})
export default class PacientesDetailsComponent {
  pacienteDetailState = inject(PacienteDetailsStateService).state;
  pacienteCitas = inject(PacienteDetailsStateService).stateCitas;

  id = input.required<string>();
  constructor() {
    effect(() => {
      this.pacienteDetailState.getById(this.id());
      this.pacienteCitas.getCitas(this.id());
    });
  }
}
