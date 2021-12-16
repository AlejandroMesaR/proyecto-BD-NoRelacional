import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, TipoVehiculo, Cliente, ClienteVehiculo} from '../models';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {ClienteVehiculoRepository} from './cliente-vehiculo.repository';
import {ClienteRepository} from './cliente.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype._id,
  VehiculoRelations
> {

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype._id>;

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype._id,
          ClienteVehiculo,
          typeof Vehiculo.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('ClienteVehiculoRepository') protected clienteVehiculoRepositoryGetter: Getter<ClienteVehiculoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clienteVehiculoRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
  }
}
