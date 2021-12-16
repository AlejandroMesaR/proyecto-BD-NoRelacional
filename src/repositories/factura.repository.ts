import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Plaza, Empleado, TipoServicio, Vehiculo} from '../models';
import {PlazaRepository} from './plaza.repository';
import {EmpleadoRepository} from './empleado.repository';
import {TipoServicioRepository} from './tipo-servicio.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype._id,
  FacturaRelations
> {

  public readonly plaza: BelongsToAccessor<Plaza, typeof Factura.prototype._id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Factura.prototype._id>;

  public readonly tipoServicio: BelongsToAccessor<TipoServicio, typeof Factura.prototype._id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Factura.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlazaRepository') protected plazaRepositoryGetter: Getter<PlazaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('TipoServicioRepository') protected tipoServicioRepositoryGetter: Getter<TipoServicioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Factura, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.tipoServicio = this.createBelongsToAccessorFor('tipoServicio', tipoServicioRepositoryGetter,);
    this.registerInclusionResolver('tipoServicio', this.tipoServicio.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.plaza = this.createBelongsToAccessorFor('plaza', plazaRepositoryGetter,);
    this.registerInclusionResolver('plaza', this.plaza.inclusionResolver);
  }
}
