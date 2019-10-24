import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICityJhpCities } from 'app/shared/model/city-jhp-cities.model';
import { CityJhpCitiesService } from './city-jhp-cities.service';

@Component({
  selector: 'jhi-city-jhp-cities-delete-dialog',
  templateUrl: './city-jhp-cities-delete-dialog.component.html'
})
export class CityJhpCitiesDeleteDialogComponent {
  city: ICityJhpCities;

  constructor(protected cityService: CityJhpCitiesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cityListModification',
        content: 'Deleted an city'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-city-jhp-cities-delete-popup',
  template: ''
})
export class CityJhpCitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ city }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CityJhpCitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.city = city;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/city-jhp-cities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/city-jhp-cities', { outlets: { popup: null } }]);
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
