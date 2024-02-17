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
  Producto,
  Image,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoImageController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/images', {
    responses: {
      '200': {
        description: 'Array of Producto has many Image',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Image>,
  ): Promise<Image[]> {
    return this.productoRepository.images(id).find(filter);
  }

  @post('/productos/{id}/images', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {
            title: 'NewImageInProducto',
            exclude: ['id'],
            optional: ['id_producto']
          }),
        },
      },
    }) image: Omit<Image, 'id'>,
  ): Promise<Image> {
    return this.productoRepository.images(id).create(image);
  }

  @patch('/productos/{id}/images', {
    responses: {
      '200': {
        description: 'Producto.Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Partial<Image>,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.productoRepository.images(id).patch(image, where);
  }

  @del('/productos/{id}/images', {
    responses: {
      '200': {
        description: 'Producto.Image DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.productoRepository.images(id).delete(where);
  }
}
