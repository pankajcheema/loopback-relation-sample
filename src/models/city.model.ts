import {Entity, model, property, hasMany} from '@loopback/repository';
import {Region} from './region.model';

@model({settings: {}})
export class City extends Entity {
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

  @hasMany(() => Region)
  regions: Region[];

  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  regions?: CityWithRelations[];
}

export type CityWithRelations = City & CityRelations;
