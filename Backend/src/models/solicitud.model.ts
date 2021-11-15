import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  CantidadVehiculo: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdSolicitud?: number;

  @property({
    type: 'string',
    required: true,
  })
  EstadoSolicitud: string;

  @hasMany(() => Vehiculo)
  SolicitudVehiculo: Vehiculo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
