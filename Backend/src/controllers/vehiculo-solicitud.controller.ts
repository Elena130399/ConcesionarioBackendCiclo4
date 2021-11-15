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
  Solicitud,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSolicitudController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Vehiculo.prototype.Placa,
  ): Promise<Solicitud> {
    return this.vehiculoRepository.VehiculoSolicitud(id);
  }
}
