import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdCiudad?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreCiudad: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasMany(() => Vehiculo)
  CiudadVehiculo: Vehiculo[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
