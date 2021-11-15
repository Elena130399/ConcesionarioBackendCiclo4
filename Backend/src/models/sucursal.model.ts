import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Sucursal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdSucursal?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreSucursal: string;

  @property({
    type: 'string',
    required: true,
  })
  DireccionSucursal: string;

  @property({
    type: 'number',
    required: true,
  })
  TelefonoSucursal: number;

  @belongsTo(() => Vehiculo, {name: 'SucursalVehiculo'})
  vehiculoId: string;

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
