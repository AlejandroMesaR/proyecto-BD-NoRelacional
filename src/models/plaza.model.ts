import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estado} from './estado.model';
import {ClienteVehiculo} from './cliente-vehiculo.model';

@model()
export class Plaza extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @belongsTo(() => Estado)
  estadoId: string;

  @belongsTo(() => ClienteVehiculo)
  clienteVehiculoId: string;

  constructor(data?: Partial<Plaza>) {
    super(data);
  }
}

export interface PlazaRelations {
  // describe navigational properties here
}

export type PlazaWithRelations = Plaza & PlazaRelations;
