import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {UsuarioCliente, UsuarioClienteRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class UsuarioClienteRepository extends DefaultCrudRepository<
  UsuarioCliente,
  typeof UsuarioCliente.prototype.id,
  UsuarioClienteRelations
> {

  public readonly tiene_un: BelongsToAccessor<Cliente, typeof UsuarioCliente.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(UsuarioCliente, dataSource);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', clienteRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
