import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryJhpCities } from 'app/shared/model/country-jhp-cities.model';
import { CountryJhpCitiesService } from './country-jhp-cities.service';

@Component({
  selector: 'jhi-country-jhp-cities-delete-dialog',
  templateUrl: './country-jhp-cities-delete-dialog.component.html'
})
export class CountryJhpCitiesDeleteDialogComponent {
  country: ICountryJhpCities;

  constructor(
    protected countryService: CountryJhpCitiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.countryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'countryListModification',
        content: 'Deleted an country'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-country-jhp-cities-delete-popup',
  template: ''
})
export class CountryJhpCitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ country }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CountryJhpCitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.country = country;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/country-jhp-cities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/country-jhp-cities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
