import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

export interface IAreaJhpCities {
  id?: number;
  name?: string;
  cities?: ICityJhpCities[];
  country?: ICountryJhpCities;
}

export class AreaJhpCities implements IAreaJhpCities {
  constructor(public id?: number, public name?: string, public cities?: ICityJhpCities[], public country?: ICountryJhpCities) {}
}
