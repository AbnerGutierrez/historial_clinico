import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../pacientes-list/pacientes-list.component'),
  },
  {
    path: 'nuevo_paciente',
    loadComponent: () => import('../nuevo-paciente/nuevo-paciente.component'),
  },
] as Routes;
