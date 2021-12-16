import {Entity, model, property} from '@loopback/repository';

@model()
export class ClienteVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<ClienteVehiculo>) {
    super(data);
  }
}

export interface ClienteVehiculoRelations {
  // describe navigational properties here
}

export type ClienteVehiculoWithRelations = ClienteVehiculo & ClienteVehiculoRelations;
