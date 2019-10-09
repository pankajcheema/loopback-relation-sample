import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  City,
  Region,
} from '../models';
import {CityRepository} from '../repositories';

export class CityRegionController {
  constructor(
    @repository(CityRepository) protected cityRepository: CityRepository,
  ) { }

  @get('/cities/{id}/regions', {
    responses: {
      '200': {
        description: 'Array of Region\'s belonging to City',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Region)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Region>,
  ): Promise<Region[]> {
    return this.cityRepository.regions(id).find(filter);
  }

  @post('/cities/{id}/regions', {
    responses: {
      '200': {
        description: 'City model instance',
        content: {'application/json': {schema: getModelSchemaRef(Region)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof City.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Region, {
            title: 'NewRegionInCity',
            exclude: ['id'],
            optional: ['cityId']
          }),
        },
      },
    }) region: Omit<Region, 'id'>,
  ): Promise<Region> {
    return this.cityRepository.regions(id).create(region);
  }

  @patch('/cities/{id}/regions', {
    responses: {
      '200': {
        description: 'City.Region PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Region, {partial: true}),
        },
      },
    })
    region: Partial<Region>,
    @param.query.object('where', getWhereSchemaFor(Region)) where?: Where<Region>,
  ): Promise<Count> {
    return this.cityRepository.regions(id).patch(region, where);
  }

  @del('/cities/{id}/regions', {
    responses: {
      '200': {
        description: 'City.Region DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Region)) where?: Where<Region>,
  ): Promise<Count> {
    return this.cityRepository.regions(id).delete(where);
  }
}
