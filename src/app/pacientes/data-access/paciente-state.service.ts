import { inject, Injectable } from '@angular/core';
import { Paciente } from '../../shared/interfaces/paciente.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { PacienteService } from './pacientes.service';
import { map } from 'rxjs';

interface State {
  pacientes: Paciente[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class PacienteStateService {
  private pacientesService = inject(PacienteService);

  private initialState: State = {
    pacientes: [],
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.pacientesService
        .getPacientes()
        .pipe(map((pacientes) => ({ pacientes, status: 'success' as const }))),
    ],
  });
}
