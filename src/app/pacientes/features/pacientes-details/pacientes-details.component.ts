import { Component, effect, inject, input } from '@angular/core';
import { PacienteDetailsStateService } from '../../data-access/paciente-state-details.service';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../data-access/pacientes.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-pacientes-details',
  imports: [RouterLink],
  templateUrl: './pacientes-details.component.html',
  providers: [PacienteDetailsStateService],
})
export default class PacientesDetailsComponent {
  pacienteDetailState = inject(PacienteDetailsStateService).state;
  pacienteCitas = inject(PacienteDetailsStateService).stateCitas;
  pacienteService = inject(PacienteService);
  router = inject(Router);

  id = input.required<string>();
  constructor() {
    effect(() => {
      this.pacienteDetailState.getById(this.id());
      this.pacienteCitas.getCitas(this.id());
    });
  }
  delete() {
    this.pacienteService.deletePaciente(this.id()).subscribe({
      next: () => {
        toast('Eliminacion exitosa');
        this.router.navigateByUrl('');
      },
      error: (err) => {
        toast('Error al eliminar');
      },
    });
  }
}
