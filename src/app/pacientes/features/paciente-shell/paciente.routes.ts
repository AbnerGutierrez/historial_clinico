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
  {
    path: 'paciente/:id',
    loadComponent: () =>
      import('../pacientes-details/pacientes-details.component'),
  },
  {
    path: 'nuevaconsulta/:id',
    loadComponent: () =>
      import('../consulta-paciente/consulta-paciente.component'),
  },
  {
    path: 'actualizar/:id',
    loadComponent: () =>
      import('../actualizar-paciente/actualizar-paciente.component'),
  },
] as Routes;
