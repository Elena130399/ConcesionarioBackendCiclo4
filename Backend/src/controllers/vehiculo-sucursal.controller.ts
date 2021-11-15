import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Sucursal,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSucursalController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.string('id') id: typeof Vehiculo.prototype.Placa,
  ): Promise<Sucursal> {
    return this.vehiculoRepository.vehiculoSucursal(id);
  }
}
