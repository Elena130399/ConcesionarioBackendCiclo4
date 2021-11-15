import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Persona, PersonaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.IdPersona,
  PersonaRelations
> {

  public readonly PersonaVehiculo: HasManyRepositoryFactory<Vehiculo, typeof Persona.prototype.IdPersona>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Persona, dataSource);
    this.PersonaVehiculo = this.createHasManyRepositoryFactoryFor('PersonaVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('PersonaVehiculo', this.PersonaVehiculo.inclusionResolver);
  }
}
