import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IManagerJhpCities, ManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';
import { ManagerJhpCitiesService } from './manager-jhp-cities.service';
import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';
import { CountryJhpCitiesService } from 'app/entities/country-jhp-cities/country-jhp-cities.service';

@Component({
  selector: 'jhi-manager-jhp-cities-update',
  templateUrl: './manager-jhp-cities-update.component.html'
})
export class ManagerJhpCitiesUpdateComponent implements OnInit {
  isSaving: boolean;

  countries: ICountryJhpCities[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    countries: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected managerService: ManagerJhpCitiesService,
    protected countryService: CountryJhpCitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ manager }) => {
      this.updateForm(manager);
    });
    this.countryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICountryJhpCities[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountryJhpCities[]>) => response.body)
      )
      .subscribe((res: ICountryJhpCities[]) => (this.countries = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(manager: IManagerJhpCities) {
    this.editForm.patchValue({
      id: manager.id,
      firstName: manager.firstName,
      lastName: manager.lastName,
      countries: manager.countries
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const manager = this.createFromForm();
    if (manager.id !== undefined) {
      this.subscribeToSaveResponse(this.managerService.update(manager));
    } else {
      this.subscribeToSaveResponse(this.managerService.create(manager));
    }
  }

  private createFromForm(): IManagerJhpCities {
    return {
      ...new ManagerJhpCities(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      countries: this.editForm.get(['countries']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManagerJhpCities>>) {
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
