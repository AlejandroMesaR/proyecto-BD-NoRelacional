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
Vehiculo,
ClienteVehiculo,
Cliente,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoClienteController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Cliente through ClienteVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.vehiculoRepository.clientes(id).find(filter);
  }

  @post('/vehiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'create a Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInVehiculo',
            exclude: ['_id'],
          }),
        },
      },
    }) cliente: Omit<Cliente, '_id'>,
  ): Promise<Cliente> {
    return this.vehiculoRepository.clientes(id).create(cliente);
  }

  @patch('/vehiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Vehiculo.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.vehiculoRepository.clientes(id).patch(cliente, where);
  }

  @del('/vehiculos/{id}/clientes', {
    responses: {
      '200': {
        description: 'Vehiculo.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.vehiculoRepository.clientes(id).delete(where);
  }
}
