import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.IdSucursal,
  SucursalRelations
> {

  public readonly SucursalVehiculo: BelongsToAccessor<Vehiculo, typeof Sucursal.prototype.IdSucursal>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Sucursal, dataSource);
    this.SucursalVehiculo = this.createBelongsToAccessorFor('SucursalVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('SucursalVehiculo', this.SucursalVehiculo.inclusionResolver);
  }
}
