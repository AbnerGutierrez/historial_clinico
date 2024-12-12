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

export interface CitaPaciente {
  nombre_1: string;
  id_reseta: number;
  id_paciente: number;
  peso: number;
  estatura: number;
  Frec_card: string;
  presion: string;
  pronostico: string;
  tratamiento: string;
}
