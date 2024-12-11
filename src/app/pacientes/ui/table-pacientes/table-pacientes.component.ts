import { Component, inject } from '@angular/core';
import { PacienteStateService } from '../../data-access/paciente-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table-pacientes',
  imports: [RouterLink],
  templateUrl: './table-pacientes.component.html',
  styleUrl: './table-pacientes.component.scss',
  providers: [PacienteStateService],
})
export default class TablePacientesComponent {
  pacienteState = inject(PacienteStateService);
}
