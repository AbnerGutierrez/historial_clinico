//aqui se generan los metodos necesarios para consumir las peticiones http
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http-service';
import { Observable } from 'rxjs';
import { Paciente } from '../../shared/interfaces/paciente.interface';
export type pacienteAgregar = Omit<Paciente, 'id_paciente'>;

@Injectable({
  providedIn: 'root',
})
export class PacienteService extends BaseHttpService {
  //READ
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  createPaciente(paciente: pacienteAgregar) {
    return this.http.post(`${this.apiUrl}/agregar`, paciente);
  }
}
