import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria, CategoriaProducto, Image, Marca} from '../models';
import {CategoriaProductoRepository} from './categoria-producto.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImageRepository} from './image.repository';
import {MarcaRepository} from './marca.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaProducto,
          typeof Producto.prototype.id
        >;

  public readonly images: HasManyRepositoryFactory<Image, typeof Producto.prototype.id>;

  public readonly tiene: BelongsToAccessor<Marca, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.MySQL') dataSource: MySqlDataSource, @repository.getter('CategoriaProductoRepository') protected categoriaProductoRepositoryGetter: Getter<CategoriaProductoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImageRepository') protected imageRepositoryGetter: Getter<ImageRepository>, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Producto, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
    this.images = this.createHasManyRepositoryFactoryFor('images', imageRepositoryGetter,);
    this.registerInclusionResolver('images', this.images.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaProductoRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
  }
}
