import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.IdDepartamento,
  DepartamentoRelations
> {

  public readonly DepartamentoVehiculo: BelongsToAccessor<Vehiculo, typeof Departamento.prototype.IdDepartamento>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Departamento, dataSource);
    this.DepartamentoVehiculo = this.createBelongsToAccessorFor('DepartamentoVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('DepartamentoVehiculo', this.DepartamentoVehiculo.inclusionResolver);
  }
}
