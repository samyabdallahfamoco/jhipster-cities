import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

@Component({
  selector: 'jhi-country-jhp-cities-detail',
  templateUrl: './country-jhp-cities-detail.component.html'
})
export class CountryJhpCitiesDetailComponent implements OnInit {
  country: ICountryJhpCities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.country = country;
    });
  }

  previousState() {
    window.history.back();
  }
}
