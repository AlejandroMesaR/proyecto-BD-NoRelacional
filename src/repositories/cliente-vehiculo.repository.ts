import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ClienteVehiculo, ClienteVehiculoRelations} from '../models';

export class ClienteVehiculoRepository extends DefaultCrudRepository<
  ClienteVehiculo,
  typeof ClienteVehiculo.prototype._id,
  ClienteVehiculoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ClienteVehiculo, dataSource);
  }
}
