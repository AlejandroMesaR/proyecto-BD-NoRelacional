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
import {Plaza} from '../models';
import {PlazaRepository} from '../repositories';

export class PlazaController {
  constructor(
    @repository(PlazaRepository)
    public plazaRepository : PlazaRepository,
  ) {}

  @post('/plazas')
  @response(200, {
    description: 'Plaza model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plaza)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plaza, {
            title: 'NewPlaza',
            exclude: ['_id'],
          }),
        },
      },
    })
    plaza: Omit<Plaza, '_id'>,
  ): Promise<Plaza> {
    return this.plazaRepository.create(plaza);
  }

  @get('/plazas/count')
  @response(200, {
    description: 'Plaza model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plaza) where?: Where<Plaza>,
  ): Promise<Count> {
    return this.plazaRepository.count(where);
  }

  @get('/plazas')
  @response(200, {
    description: 'Array of Plaza model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plaza, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plaza) filter?: Filter<Plaza>,
  ): Promise<Plaza[]> {
    return this.plazaRepository.find(filter);
  }

  @patch('/plazas')
  @response(200, {
    description: 'Plaza PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plaza, {partial: true}),
        },
      },
    })
    plaza: Plaza,
    @param.where(Plaza) where?: Where<Plaza>,
  ): Promise<Count> {
    return this.plazaRepository.updateAll(plaza, where);
  }

  @get('/plazas/{id}')
  @response(200, {
    description: 'Plaza model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plaza, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Plaza, {exclude: 'where'}) filter?: FilterExcludingWhere<Plaza>
  ): Promise<Plaza> {
    return this.plazaRepository.findById(id, filter);
  }

  @patch('/plazas/{id}')
  @response(204, {
    description: 'Plaza PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plaza, {partial: true}),
        },
      },
    })
    plaza: Plaza,
  ): Promise<void> {
    await this.plazaRepository.updateById(id, plaza);
  }

  @put('/plazas/{id}')
  @response(204, {
    description: 'Plaza PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() plaza: Plaza,
  ): Promise<void> {
    await this.plazaRepository.replaceById(id, plaza);
  }

  @del('/plazas/{id}')
  @response(204, {
    description: 'Plaza DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.plazaRepository.deleteById(id);
  }
}
