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
  Concesionario,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoConcesionarioController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/concesionario', {
    responses: {
      '200': {
        description: 'Concesionario belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Concesionario)},
          },
        },
      },
    },
  })
  async getConcesionario(
    @param.path.string('id') id: typeof Vehiculo.prototype.Placa,
  ): Promise<Concesionario> {
    return this.vehiculoRepository.VehiculoConcesionario(id);
  }
}
