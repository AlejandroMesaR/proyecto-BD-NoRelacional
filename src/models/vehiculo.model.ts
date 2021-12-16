import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Cliente} from './cliente.model';
import {ClienteVehiculo} from './cliente-vehiculo.model';

@model()
export class Vehiculo extends Entity {
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
  placas: string;

  @property({
    type: 'boolean',
    default: false,
  })
  llaveVehiculo?: boolean;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @hasMany(() => Cliente, {through: {model: () => ClienteVehiculo}})
  clientes: Cliente[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
