import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Persona} from './persona.model';
import {Departamento} from './departamento.model';
import {Sucursal} from './sucursal.model';
import {Solicitud} from './solicitud.model';
import {Concesionario} from './concesionario.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  IdVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  EstadoVehiculo: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @belongsTo(() => Ciudad, {name: 'VehiculoCiudad'})
  ciudadId: number;

  @belongsTo(() => Persona, {name: 'VehiculoPersona'})
  personaId: string;

  @belongsTo(() => Departamento, {name: 'VehiculoDepartamento'})
  departamentoId: number;

  @belongsTo(() => Sucursal, {name: 'vehiculoSucursal'})
  sucursalId: number;

  @belongsTo(() => Solicitud, {name: 'VehiculoSolicitud'})
  solicitudId: number;

  @belongsTo(() => Concesionario, {name: 'VehiculoConcesionario'})
  concesionarioId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
