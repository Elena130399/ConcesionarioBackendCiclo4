import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.IdCiudad,
  CiudadRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Ciudad.prototype.IdCiudad>;

  public readonly CiudadVehiculo: HasManyRepositoryFactory<Vehiculo, typeof Ciudad.prototype.IdCiudad>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.CiudadVehiculo = this.createHasManyRepositoryFactoryFor('CiudadVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('CiudadVehiculo', this.CiudadVehiculo.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
