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
  Cliente,
  Direccion,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteDireccionController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente has one Direccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Direccion),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Direccion>,
  ): Promise<Direccion> {
    return this.clienteRepository.tiene_un(id).get(filter);
  }

  @post('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Direccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direccion, {
            title: 'NewDireccionInCliente',
            exclude: ['id'],
            optional: ['id_cliente']
          }),
        },
      },
    }) direccion: Omit<Direccion, 'id'>,
  ): Promise<Direccion> {
    return this.clienteRepository.tiene_un(id).create(direccion);
  }

  @patch('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente.Direccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Direccion, {partial: true}),
        },
      },
    })
    direccion: Partial<Direccion>,
    @param.query.object('where', getWhereSchemaFor(Direccion)) where?: Where<Direccion>,
  ): Promise<Count> {
    return this.clienteRepository.tiene_un(id).patch(direccion, where);
  }

  @del('/clientes/{id}/direccion', {
    responses: {
      '200': {
        description: 'Cliente.Direccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Direccion)) where?: Where<Direccion>,
  ): Promise<Count> {
    return this.clienteRepository.tiene_un(id).delete(where);
  }
}
