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
import {ClienteVehiculo} from '../models';
import {ClienteVehiculoRepository} from '../repositories';

export class ClienteVehiculoController {
  constructor(
    @repository(ClienteVehiculoRepository)
    public clienteVehiculoRepository : ClienteVehiculoRepository,
  ) {}

  @post('/cliente-vehiculos')
  @response(200, {
    description: 'ClienteVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ClienteVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteVehiculo, {
            title: 'NewClienteVehiculo',
            exclude: ['_id'],
          }),
        },
      },
    })
    clienteVehiculo: Omit<ClienteVehiculo, '_id'>,
  ): Promise<ClienteVehiculo> {
    return this.clienteVehiculoRepository.create(clienteVehiculo);
  }

  @get('/cliente-vehiculos/count')
  @response(200, {
    description: 'ClienteVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ClienteVehiculo) where?: Where<ClienteVehiculo>,
  ): Promise<Count> {
    return this.clienteVehiculoRepository.count(where);
  }

  @get('/cliente-vehiculos')
  @response(200, {
    description: 'Array of ClienteVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ClienteVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ClienteVehiculo) filter?: Filter<ClienteVehiculo>,
  ): Promise<ClienteVehiculo[]> {
    return this.clienteVehiculoRepository.find(filter);
  }

  @patch('/cliente-vehiculos')
  @response(200, {
    description: 'ClienteVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteVehiculo, {partial: true}),
        },
      },
    })
    clienteVehiculo: ClienteVehiculo,
    @param.where(ClienteVehiculo) where?: Where<ClienteVehiculo>,
  ): Promise<Count> {
    return this.clienteVehiculoRepository.updateAll(clienteVehiculo, where);
  }

  @get('/cliente-vehiculos/{id}')
  @response(200, {
    description: 'ClienteVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ClienteVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ClienteVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<ClienteVehiculo>
  ): Promise<ClienteVehiculo> {
    return this.clienteVehiculoRepository.findById(id, filter);
  }

  @patch('/cliente-vehiculos/{id}')
  @response(204, {
    description: 'ClienteVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClienteVehiculo, {partial: true}),
        },
      },
    })
    clienteVehiculo: ClienteVehiculo,
  ): Promise<void> {
    await this.clienteVehiculoRepository.updateById(id, clienteVehiculo);
  }

  @put('/cliente-vehiculos/{id}')
  @response(204, {
    description: 'ClienteVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clienteVehiculo: ClienteVehiculo,
  ): Promise<void> {
    await this.clienteVehiculoRepository.replaceById(id, clienteVehiculo);
  }

  @del('/cliente-vehiculos/{id}')
  @response(204, {
    description: 'ClienteVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteVehiculoRepository.deleteById(id);
  }
}
