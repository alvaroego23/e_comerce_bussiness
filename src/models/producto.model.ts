import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {CategoriaProducto} from './categoria-producto.model';
import {Image} from './image.model';
import {Marca} from './marca.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'number',
    default: 0,
  })
  clasificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaProducto, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => Image, {keyTo: 'id_producto'})
  images: Image[];

  @belongsTo(() => Marca, {name: 'tiene'})
  id_marca: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
