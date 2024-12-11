import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pacientes/features/paciente-shell/paciente.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
