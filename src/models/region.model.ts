import {Entity, model, property, belongsTo} from '@loopback/repository';
import {City} from './city.model';

@model({settings: {}})
export class Region extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<Region>) {
    super(data);
  }
}

export interface RegionRelations {
  // describe navigational properties here
}

export type RegionWithRelations = Region & RegionRelations;
