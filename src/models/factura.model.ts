import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plaza} from './plaza.model';
import {Empleado} from './empleado.model';
import {TipoServicio} from './tipo-servicio.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
    required: true,
  })
  horaEntrada: string;

  @property({
    type: 'date',
    required: true,
  })
  horaSalida: string;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @belongsTo(() => Plaza)
  plazaId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => TipoServicio)
  tipoServicioId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
