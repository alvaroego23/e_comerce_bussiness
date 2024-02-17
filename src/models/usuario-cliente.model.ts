import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class UsuarioCliente extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Cliente, {name: 'tiene_un'})
  id_cliente: number;

  constructor(data?: Partial<UsuarioCliente>) {
    super(data);
  }
}

export interface UsuarioClienteRelations {
  // describe navigational properties here
}

export type UsuarioClienteWithRelations = UsuarioCliente & UsuarioClienteRelations;
