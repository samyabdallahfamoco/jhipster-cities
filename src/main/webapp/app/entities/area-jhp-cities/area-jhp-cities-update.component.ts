import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAreaJhpCities, AreaJhpCities } from 'app/shared/model/area-jhp-cities.model';
import { AreaJhpCitiesService } from './area-jhp-cities.service';
import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';
import { CountryJhpCitiesService } from 'app/entities/country-jhp-cities/country-jhp-cities.service';

@Component({
  selector: 'jhi-area-jhp-cities-update',
  templateUrl: './area-jhp-cities-update.component.html'
})
export class AreaJhpCitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  countries: ICountryJhpCities[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    country: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected areaService: AreaJhpCitiesService,
    protected countryService: CountryJhpCitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ area }) => {
      this.updateForm(area);
    });
    this.countryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICountryJhpCities[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountryJhpCities[]>) => response.body)
      )
      .subscribe((res: ICountryJhpCities[]) => (this.countries = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(area: IAreaJhpCities) {
    this.editForm.patchValue({
      id: area.id,
      name: area.name,
      country: area.country
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const area = this.createFromForm();
    if (area.id !== undefined) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  private createFromForm(): IAreaJhpCities {
    return {
      ...new AreaJhpCities(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      country: this.editForm.get(['country']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreaJhpCities>>) {
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

  trackCountryById(index: number, item: ICountryJhpCities) {
    return item.id;
  }
}
