import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Cliente,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaClienteController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<Cliente> {
    return this.facturaRepository.tiene_un(id);
  }
}
