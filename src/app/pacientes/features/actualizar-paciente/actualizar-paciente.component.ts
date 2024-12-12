import { Component, effect, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { PacienteService } from '../../data-access/pacientes.service';
import { isRequired } from '../../utils/validator';
import { PacienteDetailsStateService } from '../../data-access/paciente-state-details.service';

interface updatePaciente {
  nombre: FormControl<string | null>;
  F_nacimiento: FormControl<string | null>;
  F_inicio_H: FormControl<string | null>;
  alergias: FormControl<string | null>;
}

@Component({
  selector: 'app-actualizar-paciente',
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar-paciente.component.html',
  styles: ``,
  providers: [PacienteDetailsStateService],
})
export default class ActualizarPacienteComponent {
  pacienteDetailState = inject(PacienteDetailsStateService).state;
  private _formBuilder = inject(FormBuilder);
  private pacienteService = inject(PacienteService);
  private route = inject(Router);
  id = input.required<string>();

  constructor() {
    effect(() => {
      this.pacienteDetailState.getById(this.id());
    });
  }
  formUpdate = this._formBuilder.group<updatePaciente>({
    nombre: this._formBuilder.control('', Validators.required),
    F_nacimiento: this._formBuilder.control('', Validators.required),
    F_inicio_H: this._formBuilder.control('', Validators.required),
    alergias: this._formBuilder.control('No tiene alergias'),
  });

  isRequired(field: 'nombre' | 'F_nacimiento' | 'F_inicio_H') {
    return isRequired(field, this.formUpdate);
  }

  submit() {
    if (this.formUpdate.invalid) return;

    //OBTENIENDO VALORES DEL FORMULARIO

    let nombre_1, nombre_2, apellidoM, apellidoP;
    const nombre = this.formUpdate.value.nombre;
    const nombreDividido = nombre?.split(/\s+/);
    if (nombreDividido?.length === 4) {
      nombre_1 = nombreDividido[0];
      nombre_2 = nombreDividido[1];
      apellidoP = nombreDividido[2];
      apellidoM = nombreDividido[3];
    }
    if (nombreDividido?.length === 3) {
      nombre_1 = nombreDividido[0];
      nombre_2 = '';
      apellidoP = nombreDividido[1];
      apellidoM = nombreDividido[2];
    }
    const { F_nacimiento, F_inicio_H, alergias } = this.formUpdate.value;

    if (!nombre || !F_nacimiento || !F_inicio_H) return;

    const paciente = {
      nombre_1,
      nombre_2,
      apellidoM,
      apellidoP,
      F_nacimiento,
      F_inicio_H,
      alergias,
    };

    console.log(paciente);
    //LOGICA PARA AGREGAR UN PACIENTE NUEVO
    this.pacienteService.updatePaciente(paciente, this.id()).subscribe({
      next: (response) => {
        console.log('Paciente agregado exitosamente:', response);
        toast('Paciente modificado correctamente');
        this.route.navigateByUrl(`/paciente/${this.id()}`);
      },
      error: (error) => {
        toast.error('Error al actualizar paciente');
      },
    });
  }
}
