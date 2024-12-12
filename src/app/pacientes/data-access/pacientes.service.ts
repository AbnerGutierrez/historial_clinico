//aqui se generan los metodos necesarios para consumir las peticiones http
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http-service';
import { map, Observable } from 'rxjs';
import {
  Paciente,
  CitaPaciente,
} from '../../shared/interfaces/paciente.interface';
export type pacienteAgregar = Omit<Paciente, 'id_paciente'>;

@Injectable({
  providedIn: 'root',
})
export class PacienteService extends BaseHttpService {
  //READ
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  //CREATE FUNCIONA, se debe de suscribir en donde se va a ocupar
  createPaciente(paciente: pacienteAgregar) {
    return this.http.post(`${this.apiUrl}/agregar`, paciente);
  }

  //READ ONE
  getPacienteu(id_paciente: string): Observable<Paciente> {
    return this.http
      .get<Paciente[]>(`${this.apiUrl}/${id_paciente}`)
      .pipe(map((pacientes) => pacientes[0])); //esto porque estaba resiviendo el dato en un objeto :/
  }
  //CONSULTAR CITAS DE PACIENTES
  getCitasPaciente(id_paciente: string): Observable<CitaPaciente[]> {
    return this.http.get<CitaPaciente[]>(`${this.apiUrl}/citas/${id_paciente}`);
  }
}
