import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudad,
  Vehiculo,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadVehiculoController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Ciudad.prototype.IdCiudad,
  ): Promise<Vehiculo> {
    return this.ciudadRepository.vehiculo(id);
  }
}
