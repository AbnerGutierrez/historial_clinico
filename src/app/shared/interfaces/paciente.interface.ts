export interface Paciente {
  id_paciente: number;
  nombre_1: string | undefined;
  nombre_2: string | undefined;
  apellidoM: string | undefined;
  apellidoP: string | undefined;
  F_nacimiento: string | undefined;
  F_inicio_H: string | null;
  alergias: string | null | undefined;
}
