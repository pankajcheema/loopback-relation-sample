import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Region,
  City,
} from '../models';
import {RegionRepository} from '../repositories';

export class RegionCityController {
  constructor(
    @repository(RegionRepository)
    public regionRepository: RegionRepository,
  ) { }

  @get('/regions/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Region',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
          },
        },
      },
    },
  })
  async getCity(
    @param.path.number('id') id: typeof Region.prototype.id,
  ): Promise<City> {
    return this.regionRepository.city(id);
  }
}
