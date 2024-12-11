import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isRequired } from '../../utils/validator';
import { PacienteService } from '../../data-access/pacientes.service';

interface FormNuevoPaciente {
  nombre: FormControl<string | null>;
  F_nacimiento: FormControl<string | null>;
  F_inicio_H: FormControl<string | null>;
  alergias: FormControl<string | null>;
}

@Component({
  selector: 'app-nuevo-paciente',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-paciente.component.html',
})
export default class NuevoPacienteComponent {
  private _formBuilder = inject(FormBuilder);
  private pacienteService = inject(PacienteService);

  isRequired(field: 'nombre' | 'F_nacimiento' | 'F_inicio_H') {
    return isRequired(field, this.form);
  }

  form = this._formBuilder.group<FormNuevoPaciente>({
    nombre: this._formBuilder.control('', Validators.required),
    F_nacimiento: this._formBuilder.control('', Validators.required),
    F_inicio_H: this._formBuilder.control('', Validators.required),
    alergias: this._formBuilder.control('No tiene alergias'),
  });

  submit() {
    if (this.form.invalid) return;
    let nombre_1, nombre_2, apellidoM, apellidoP;
    const nombre = this.form.value.nombre;
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
    const { F_nacimiento, F_inicio_H, alergias } = this.form.value;

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

    //LOGICA PARA CREAR UN PACIENTE NUEVO

    this.pacienteService.createPaciente(paciente).subscribe(
      (response) => {
        console.log('Paciente agregado exitosamente:', response);
      },
      (error) => {
        console.error('Error al agregar paciente:', error);
      }
    );
  }
}
