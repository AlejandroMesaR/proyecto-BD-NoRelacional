import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  tarifa: number;


  constructor(data?: Partial<TipoServicio>) {
    super(data);
  }
}

export interface TipoServicioRelations {
  // describe navigational properties here
}

export type TipoServicioWithRelations = TipoServicio & TipoServicioRelations;
