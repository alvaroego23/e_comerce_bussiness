import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Factura, Direccion, UsuarioCliente} from '../models';
import {FacturaRepository} from './factura.repository';
import {DireccionRepository} from './direccion.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly tiene_muchas: HasManyRepositoryFactory<Factura, typeof Cliente.prototype.id>;

  public readonly tiene_un: HasOneRepositoryFactory<Direccion, typeof Cliente.prototype.id>;

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('DireccionRepository') protected direccionRepositoryGetter: Getter<DireccionRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', direccionRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.tiene_muchas = this.createHasManyRepositoryFactoryFor('tiene_muchas', facturaRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchas', this.tiene_muchas.inclusionResolver);
  }
}
