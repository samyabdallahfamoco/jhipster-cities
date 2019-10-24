import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';
import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

export interface ICountryJhpCities {
  id?: number;
  name?: string;
  areas?: IAreaJhpCities[];
  managers?: IManagerJhpCities[];
}

export class CountryJhpCities implements ICountryJhpCities {
  constructor(public id?: number, public name?: string, public areas?: IAreaJhpCities[], public managers?: IManagerJhpCities[]) {}
}
