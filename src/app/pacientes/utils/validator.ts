import { FormGroup } from '@angular/forms';

export const isRequired = (
  field: 'nombre' | 'F_nacimiento' | 'F_inicio_H',
  form: FormGroup
) => {
  const control = form.get(field);

  return control && control.touched && control.hasError('required');
};
