import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.IdSolicitud,
  SolicitudRelations
> {

  public readonly SolicitudVehiculo: HasManyRepositoryFactory<Vehiculo, typeof Solicitud.prototype.IdSolicitud>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.SolicitudVehiculo = this.createHasManyRepositoryFactoryFor('SolicitudVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('SolicitudVehiculo', this.SolicitudVehiculo.inclusionResolver);
  }
}
