import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

export interface IManagerJhpCities {
  id?: number;
  firstName?: string;
  lastName?: string;
  countries?: ICountryJhpCities[];
}

export class ManagerJhpCities implements IManagerJhpCities {
  constructor(public id?: number, public firstName?: string, public lastName?: string, public countries?: ICountryJhpCities[]) {}
}
