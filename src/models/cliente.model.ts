import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';
import {Direccion} from './direccion.model';
import {UsuarioCliente} from './usuario-cliente.model';

@model()
export class Cliente extends Entity {
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
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @hasMany(() => Factura, {keyTo: 'id_cliente'})
  tiene_muchas: Factura[];

  @hasOne(() => Direccion, {keyTo: 'id_cliente'})
  tiene_un: Direccion;

  @hasOne(() => UsuarioCliente, {keyTo: 'id_cliente'})
  usuarioCliente: UsuarioCliente;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
