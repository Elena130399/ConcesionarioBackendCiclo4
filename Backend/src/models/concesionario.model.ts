import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Concesionario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  NombreConcesionario: string;

  @property({
    type: 'string',
    required: true,
  })
  IdConcesionario: string;

  @property({
    type: 'number',
    required: true,
  })
  TelefonoConcesionario: number;

  @property({
    type: 'string',
    required: true,
  })
  DireccionConcesionario: string;

  @hasMany(() => Vehiculo)
  ConcesionarioVehiculo: Vehiculo[];

  constructor(data?: Partial<Concesionario>) {
    super(data);
  }
}

export interface ConcesionarioRelations {
  // describe navigational properties here
}

export type ConcesionarioWithRelations = Concesionario & ConcesionarioRelations;
