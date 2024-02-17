import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuarioCliente,
  Cliente,
} from '../models';
import {UsuarioClienteRepository} from '../repositories';

export class UsuarioClienteClienteController {
  constructor(
    @repository(UsuarioClienteRepository)
    public usuarioClienteRepository: UsuarioClienteRepository,
  ) { }

  @get('/usuario-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to UsuarioCliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof UsuarioCliente.prototype.id,
  ): Promise<Cliente> {
    return this.usuarioClienteRepository.tiene_un(id);
  }
}
