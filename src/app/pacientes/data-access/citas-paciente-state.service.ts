import { inject, Injectable } from '@angular/core';
import {
  Paciente,
  CitaPaciente,
} from '../../shared/interfaces/paciente.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { PacienteService } from './pacientes.service';
import { map, Observable, switchMap } from 'rxjs';

interface State {
  pacienteRecetas: CitaPaciente[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class CitasPacienteDetailsStateService {
  private pacientesService = inject(PacienteService);

  private initialState: State = {
    pacienteRecetas: [],
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getCitasPaciente: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.pacientesService.getCitasPaciente(id)),
          map((data) => ({ pacienteRecetas: data, status: 'success' as const }))
        ),
    },
  });
}
