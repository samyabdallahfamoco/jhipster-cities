import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

export interface ICityJhpCities {
  id?: number;
  name?: string;
  nbPeople?: number;
  postalCode?: string;
  area?: IAreaJhpCities;
}

export class CityJhpCities implements ICityJhpCities {
  constructor(
    public id?: number,
    public name?: string,
    public nbPeople?: number,
    public postalCode?: string,
    public area?: IAreaJhpCities
  ) {}
}
