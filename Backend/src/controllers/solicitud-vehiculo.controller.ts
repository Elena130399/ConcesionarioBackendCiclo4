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
  Solicitud,
  Vehiculo,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVehiculoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.solicitudRepository.SolicitudVehiculo(id).find(filter);
  }

  @post('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.IdSolicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInSolicitud',
            exclude: ['Placa'],
            optional: ['solicitudId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Placa'>,
  ): Promise<Vehiculo> {
    return this.solicitudRepository.SolicitudVehiculo(id).create(vehiculo);
  }

  @patch('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.solicitudRepository.SolicitudVehiculo(id).patch(vehiculo, where);
  }

  @del('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.solicitudRepository.SolicitudVehiculo(id).delete(where);
  }
}
