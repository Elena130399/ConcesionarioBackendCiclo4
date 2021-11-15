import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Vehiculo,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoVehiculoController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Departamento.prototype.IdDepartamento,
  ): Promise<Vehiculo> {
    return this.departamentoRepository.DepartamentoVehiculo(id);
  }
}
