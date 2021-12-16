import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoServicio, TipoServicioRelations} from '../models';

export class TipoServicioRepository extends DefaultCrudRepository<
  TipoServicio,
  typeof TipoServicio.prototype._id,
  TipoServicioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoServicio, dataSource);
  }
}
