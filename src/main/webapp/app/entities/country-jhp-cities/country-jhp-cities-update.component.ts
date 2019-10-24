import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICountryJhpCities, CountryJhpCities } from 'app/shared/model/country-jhp-cities.model';
import { CountryJhpCitiesService } from './country-jhp-cities.service';
import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';
import { ManagerJhpCitiesService } from 'app/entities/manager-jhp-cities/manager-jhp-cities.service';

@Component({
  selector: 'jhi-country-jhp-cities-update',
  templateUrl: './country-jhp-cities-update.component.html'
})
export class CountryJhpCitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  managers: IManagerJhpCities[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected countryService: CountryJhpCitiesService,
    protected managerService: ManagerJhpCitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);
    });
    this.managerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IManagerJhpCities[]>) => mayBeOk.ok),
        map((response: HttpResponse<IManagerJhpCities[]>) => response.body)
      )
      .subscribe((res: IManagerJhpCities[]) => (this.managers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(country: ICountryJhpCities) {
    this.editForm.patchValue({
      id: country.id,
      name: country.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountryJhpCities {
    return {
      ...new CountryJhpCities(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryJhpCities>>) {
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

  trackManagerById(index: number, item: IManagerJhpCities) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
