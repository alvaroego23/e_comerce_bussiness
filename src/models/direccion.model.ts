import {Entity, model, property} from '@loopback/repository';

@model()
export class Direccion extends Entity {
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
  calle: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'number',
  })
  id_cliente?: number;

  constructor(data?: Partial<Direccion>) {
    super(data);
  }
}

export interface DireccionRelations {
  // describe navigational properties here
}

export type DireccionWithRelations = Direccion & DireccionRelations;
