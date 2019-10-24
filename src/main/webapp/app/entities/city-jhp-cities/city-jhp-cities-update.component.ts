import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICityJhpCities, CityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { CityJhpCitiesService } from './city-jhp-cities.service';
import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';
import { AreaJhpCitiesService } from 'app/entities/area-jhp-cities/area-jhp-cities.service';

@Component({
  selector: 'jhi-city-jhp-cities-update',
  templateUrl: './city-jhp-cities-update.component.html'
})
export class CityJhpCitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  areas: IAreaJhpCities[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    nbPeople: [null, [Validators.required]],
    postalCode: [null, [Validators.required]],
    area: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cityService: CityJhpCitiesService,
    protected areaService: AreaJhpCitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ city }) => {
      this.updateForm(city);
    });
    this.areaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAreaJhpCities[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAreaJhpCities[]>) => response.body)
      )
      .subscribe((res: IAreaJhpCities[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(city: ICityJhpCities) {
    this.editForm.patchValue({
      id: city.id,
      name: city.name,
      nbPeople: city.nbPeople,
      postalCode: city.postalCode,
      area: city.area
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const city = this.createFromForm();
    if (city.id !== undefined) {
      this.subscribeToSaveResponse(this.cityService.update(city));
    } else {
      this.subscribeToSaveResponse(this.cityService.create(city));
    }
  }

  private createFromForm(): ICityJhpCities {
    return {
      ...new CityJhpCities(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      nbPeople: this.editForm.get(['nbPeople']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      area: this.editForm.get(['area']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICityJhpCities>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAreaById(index: number, item: IAreaJhpCities) {
    return item.id;
  }
}
