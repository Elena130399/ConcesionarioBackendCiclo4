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
  Departamento,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoDepartamentoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Vehiculo.prototype.Placa,
  ): Promise<Departamento> {
    return this.vehiculoRepository.VehiculoDepartamento(id);
  }
}
