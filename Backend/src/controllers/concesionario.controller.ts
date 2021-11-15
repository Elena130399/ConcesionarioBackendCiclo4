import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Concesionario} from '../models';
import {ConcesionarioRepository} from '../repositories';

export class ConcesionarioController {
  constructor(
    @repository(ConcesionarioRepository)
    public concesionarioRepository : ConcesionarioRepository,
  ) {}

  @post('/concesionarios')
  @response(200, {
    description: 'Concesionario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Concesionario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concesionario, {
            title: 'NewConcesionario',
            
          }),
        },
      },
    })
    concesionario: Concesionario,
  ): Promise<Concesionario> {
    return this.concesionarioRepository.create(concesionario);
  }

  @get('/concesionarios/count')
  @response(200, {
    description: 'Concesionario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Concesionario) where?: Where<Concesionario>,
  ): Promise<Count> {
    return this.concesionarioRepository.count(where);
  }

  @get('/concesionarios')
  @response(200, {
    description: 'Array of Concesionario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Concesionario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Concesionario) filter?: Filter<Concesionario>,
  ): Promise<Concesionario[]> {
    return this.concesionarioRepository.find(filter);
  }

  @patch('/concesionarios')
  @response(200, {
    description: 'Concesionario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concesionario, {partial: true}),
        },
      },
    })
    concesionario: Concesionario,
    @param.where(Concesionario) where?: Where<Concesionario>,
  ): Promise<Count> {
    return this.concesionarioRepository.updateAll(concesionario, where);
  }

  @get('/concesionarios/{id}')
  @response(200, {
    description: 'Concesionario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Concesionario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Concesionario, {exclude: 'where'}) filter?: FilterExcludingWhere<Concesionario>
  ): Promise<Concesionario> {
    return this.concesionarioRepository.findById(id, filter);
  }

  @patch('/concesionarios/{id}')
  @response(204, {
    description: 'Concesionario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Concesionario, {partial: true}),
        },
      },
    })
    concesionario: Concesionario,
  ): Promise<void> {
    await this.concesionarioRepository.updateById(id, concesionario);
  }

  @put('/concesionarios/{id}')
  @response(204, {
    description: 'Concesionario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() concesionario: Concesionario,
  ): Promise<void> {
    await this.concesionarioRepository.replaceById(id, concesionario);
  }

  @del('/concesionarios/{id}')
  @response(204, {
    description: 'Concesionario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.concesionarioRepository.deleteById(id);
  }
}
