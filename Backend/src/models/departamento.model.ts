import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  IdDepartamento?: number;

  @property({
    type: 'string',
    required: true,
  })
  NombreDepartamento: string;

  @belongsTo(() => Vehiculo, {name: 'DepartamentoVehiculo'})
  vehiculoId: string;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
