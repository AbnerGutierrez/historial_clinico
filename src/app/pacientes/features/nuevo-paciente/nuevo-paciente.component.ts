import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isRequired } from '../../utils/validator';
import { PacienteService } from '../../data-access/pacientes.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  providers: [DatePipe], // Registrar DatePipe aquí
})
export default class NuevoPacienteComponent {
  private _formBuilder = inject(FormBuilder);
  private pacienteService = inject(PacienteService);
  private route = inject(Router);
  private datepipe = inject(DatePipe);
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

    //OBTENIENDO VALORES DEL FORMULARIO

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
    } else {
      toast.warning('Coloca un nombre valido ');
    }
    let { F_nacimiento, F_inicio_H, alergias } = this.form.value;
    F_nacimiento = this.datepipe.transform(F_nacimiento, 'yyyy-MM-dd');
    F_inicio_H = this.datepipe.transform(F_inicio_H, 'yyyy-MM-dd');

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
    //LOGICA PARA AGREGAR UN PACIENTE NUEVO
    this.pacienteService.createPaciente(paciente).subscribe({
      next: (response) => {
        console.log('Paciente agregado exitosamente:', response);
        toast.message('Usuario creado correctamente', {
          description: `Nuevo paciente: ${nombre}`,
        });
        this.route.navigateByUrl('');
      },
      error: (error) => {
        toast.error('Error al agregar paciente');
      },
    });
  }
}
