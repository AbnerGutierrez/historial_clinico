import { Component } from '@angular/core';
import TablePacientesComponent from '../../ui/table-pacientes/table-pacientes.component';

@Component({
  selector: 'app-pacientes-list',
  imports: [TablePacientesComponent],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss',
})
export default class PacientesListComponent {}
