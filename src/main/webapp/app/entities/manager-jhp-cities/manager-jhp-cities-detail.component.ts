import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

@Component({
  selector: 'jhi-manager-jhp-cities-detail',
  templateUrl: './manager-jhp-cities-detail.component.html'
})
export class ManagerJhpCitiesDetailComponent implements OnInit {
  manager: IManagerJhpCities;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ manager }) => {
      this.manager = manager;
    });
  }

  previousState() {
    window.history.back();
  }
}
