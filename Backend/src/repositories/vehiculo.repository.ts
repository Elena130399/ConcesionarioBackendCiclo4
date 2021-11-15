import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Ciudad, Persona, Departamento, Sucursal, Solicitud, Concesionario} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {PersonaRepository} from './persona.repository';
import {DepartamentoRepository} from './departamento.repository';
import {SucursalRepository} from './sucursal.repository';
import {SolicitudRepository} from './solicitud.repository';
import {ConcesionarioRepository} from './concesionario.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Placa,
  VehiculoRelations
> {

  public readonly VehiculoCiudad: BelongsToAccessor<Ciudad, typeof Vehiculo.prototype.Placa>;

  public readonly VehiculoPersona: BelongsToAccessor<Persona, typeof Vehiculo.prototype.Placa>;

  public readonly VehiculoDepartamento: BelongsToAccessor<Departamento, typeof Vehiculo.prototype.Placa>;

  public readonly vehiculoSucursal: BelongsToAccessor<Sucursal, typeof Vehiculo.prototype.Placa>;

  public readonly VehiculoSolicitud: BelongsToAccessor<Solicitud, typeof Vehiculo.prototype.Placa>;

  public readonly VehiculoConcesionario: BelongsToAccessor<Concesionario, typeof Vehiculo.prototype.Placa>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('ConcesionarioRepository') protected concesionarioRepositoryGetter: Getter<ConcesionarioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.VehiculoConcesionario = this.createBelongsToAccessorFor('VehiculoConcesionario', concesionarioRepositoryGetter,);
    this.registerInclusionResolver('VehiculoConcesionario', this.VehiculoConcesionario.inclusionResolver);
    this.VehiculoSolicitud = this.createBelongsToAccessorFor('VehiculoSolicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('VehiculoSolicitud', this.VehiculoSolicitud.inclusionResolver);
    this.vehiculoSucursal = this.createBelongsToAccessorFor('vehiculoSucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('vehiculoSucursal', this.vehiculoSucursal.inclusionResolver);
    this.VehiculoDepartamento = this.createBelongsToAccessorFor('VehiculoDepartamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('VehiculoDepartamento', this.VehiculoDepartamento.inclusionResolver);
    this.VehiculoPersona = this.createBelongsToAccessorFor('VehiculoPersona', personaRepositoryGetter,);
    this.registerInclusionResolver('VehiculoPersona', this.VehiculoPersona.inclusionResolver);
    this.VehiculoCiudad = this.createBelongsToAccessorFor('VehiculoCiudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('VehiculoCiudad', this.VehiculoCiudad.inclusionResolver);
  }
}
