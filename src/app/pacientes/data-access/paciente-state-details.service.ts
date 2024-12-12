import { inject, Injectable } from '@angular/core';
import {
  Paciente,
  CitaPaciente,
} from '../../shared/interfaces/paciente.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { PacienteService } from './pacientes.service';
import { map, Observable, switchMap } from 'rxjs';

interface State {
  paciente: Paciente | null;
  status: 'loading' | 'success' | 'error';
}
interface StateCitas {
  pacienteCitas: CitaPaciente[];
  status: 'loading' | 'success' | 'error';
}

@Injectable()
export class PacienteDetailsStateService {
  private pacientesService = inject(PacienteService);
  //Injectar lo de las citas

  private initialState: State = {
    paciente: null,
    status: 'loading' as const,
  };
  private initialStateCitas: StateCitas = {
    pacienteCitas: [],
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.pacientesService.getPacienteu(id)),
          map((data) => ({ paciente: data, status: 'success' as const }))
        ),
    },
  });
  stateCitas = signalSlice({
    initialState: this.initialStateCitas,
    actionSources: {
      getCitas: (_state, $: Observable<string>) =>
        $.pipe(
          switchMap((id) => this.pacientesService.getCitasPaciente(id)),
          map((data) => ({ pacienteCitas: data, status: 'success' as const }))
        ),
    },
  });
}
