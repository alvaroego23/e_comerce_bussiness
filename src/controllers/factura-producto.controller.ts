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
Factura,
ProductoFactura,
Producto,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaProductoController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Factura has many Producto through ProductoFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.facturaRepository.productos(id).find(filter);
  }

  @post('/facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'create a Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInFactura',
            exclude: ['id'],
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.facturaRepository.productos(id).create(producto);
  }

  @patch('/facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Factura.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.facturaRepository.productos(id).patch(producto, where);
  }

  @del('/facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Factura.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.facturaRepository.productos(id).delete(where);
  }
}
