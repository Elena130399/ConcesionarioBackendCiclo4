import {Model, model, property} from '@loopback/repository';

@model()
export class Credenciales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;


  constructor(data?: Partial<Credenciales>) {
    super(data);
  }
}

export interface CredencialesRelations {
  // describe navigational properties here
}
