import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Concesionario, ConcesionarioRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class ConcesionarioRepository extends DefaultCrudRepository<
  Concesionario,
  typeof Concesionario.prototype.NombreConcesionario,
  ConcesionarioRelations
> {

  public readonly ConcesionarioVehiculo: HasManyRepositoryFactory<Vehiculo, typeof Concesionario.prototype.NombreConcesionario>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Concesionario, dataSource);
    this.ConcesionarioVehiculo = this.createHasManyRepositoryFactoryFor('ConcesionarioVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('ConcesionarioVehiculo', this.ConcesionarioVehiculo.inclusionResolver);
  }
}
