import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Direccion, DireccionRelations} from '../models';

export class DireccionRepository extends DefaultCrudRepository<
  Direccion,
  typeof Direccion.prototype.id,
  DireccionRelations
> {
  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource,
  ) {
    super(Direccion, dataSource);
  }
}
