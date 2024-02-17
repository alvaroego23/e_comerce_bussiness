import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {ProductoFactura} from './producto-factura.model';
import {Cliente} from './cliente.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  consecutivo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  hora?: string;

  @hasMany(() => Producto, {through: {model: () => ProductoFactura, keyFrom: 'id_factura', keyTo: 'id_producto'}})
  productos: Producto[];

  @belongsTo(() => Cliente, {name: 'tiene_un'})
  id_cliente: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
