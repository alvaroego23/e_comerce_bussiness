import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Producto, ProductoFactura, Cliente} from '../models';
import {ProductoFacturaRepository} from './producto-factura.repository';
import {ProductoRepository} from './producto.repository';
import {ClienteRepository} from './cliente.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.id,
          ProductoFactura,
          typeof Factura.prototype.id
        >;

  public readonly tiene_un: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('ProductoFacturaRepository') protected productoFacturaRepositoryGetter: Getter<ProductoFacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Factura, dataSource);
    this.tiene_un = this.createBelongsToAccessorFor('tiene_un', clienteRepositoryGetter,);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, productoFacturaRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
