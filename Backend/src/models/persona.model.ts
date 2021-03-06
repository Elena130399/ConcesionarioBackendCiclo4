import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Persona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  IdPersona: string;

  @property({
    type: 'string',
    required: false,
  })

  Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  NombrePersona: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
    generated: true,
  })
  Edad: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Rol: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @hasMany(() => Vehiculo)
  PersonaVehiculo: Vehiculo[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
