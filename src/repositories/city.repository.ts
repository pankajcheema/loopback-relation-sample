import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {City, CityRelations, Region} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RegionRepository} from './region.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {
  public readonly regions: HasManyRepositoryFactory<
    Region,
    typeof City.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('RegionRepository')
    protected regionRepositoryGetter: Getter<RegionRepository>,
  ) {
    super(City, dataSource);
    this.regions = this.createHasManyRepositoryFactoryFor(
      'regions',
      regionRepositoryGetter,
    );
    this.registerInclusionResolver('regions', this.regions.inclusionResolver);
    console.log('coming here ');
    console.log(this.regions);
  }
}
