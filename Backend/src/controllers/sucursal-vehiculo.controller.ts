import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sucursal,
  Vehiculo,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalVehiculoController {
  constructor(
    @repository(SucursalRepository)
    public sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Sucursal.prototype.IdSucursal,
  ): Promise<Vehiculo> {
    return this.sucursalRepository.SucursalVehiculo(id);
  }
}
