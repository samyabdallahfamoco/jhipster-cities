import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';

@Component({
  selector: 'jhi-city-jhp-cities-detail',
  templateUrl: './city-jhp-cities-detail.component.html'
})
export class CityJhpCitiesDetailComponent implements OnInit {
  city: ICityJhpCities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ city }) => {
      this.city = city;
    });
  }

  previousState() {
    window.history.back();
  }
}
