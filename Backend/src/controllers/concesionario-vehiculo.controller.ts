import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Concesionario,
  Vehiculo,
} from '../models';
import {ConcesionarioRepository} from '../repositories';

export class ConcesionarioVehiculoController {
  constructor(
    @repository(ConcesionarioRepository) protected concesionarioRepository: ConcesionarioRepository,
  ) { }

  @get('/concesionarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Concesionario has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.concesionarioRepository.ConcesionarioVehiculo(id).find(filter);
  }

  @post('/concesionarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Concesionario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Concesionario.prototype.NombreConcesionario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInConcesionario',
            exclude: ['Placa'],
            optional: ['concesionarioId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Placa'>,
  ): Promise<Vehiculo> {
    return this.concesionarioRepository.ConcesionarioVehiculo(id).create(vehiculo);
  }

  @patch('/concesionarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Concesionario.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.concesionarioRepository.ConcesionarioVehiculo(id).patch(vehiculo, where);
  }

  @del('/concesionarios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Concesionario.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.concesionarioRepository.ConcesionarioVehiculo(id).delete(where);
  }
}
