import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

@Component({
  selector: 'jhi-area-jhp-cities-detail',
  templateUrl: './area-jhp-cities-detail.component.html'
})
export class AreaJhpCitiesDetailComponent implements OnInit {
  area: IAreaJhpCities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ area }) => {
      this.area = area;
    });
  }

  previousState() {
    window.history.back();
  }
}
