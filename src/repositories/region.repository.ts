import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Region, RegionRelations, City} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CityRepository} from './city.repository';

export class RegionRepository extends DefaultCrudRepository<
  Region,
  typeof Region.prototype.id,
  RegionRelations
> {

  public readonly city: BelongsToAccessor<City, typeof Region.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Region, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
  }
}
