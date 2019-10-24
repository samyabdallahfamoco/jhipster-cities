import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAreaJhpCities } from 'app/shared/model/area-jhp-cities.model';
import { AreaJhpCitiesService } from './area-jhp-cities.service';

@Component({
  selector: 'jhi-area-jhp-cities-delete-dialog',
  templateUrl: './area-jhp-cities-delete-dialog.component.html'
})
export class AreaJhpCitiesDeleteDialogComponent {
  area: IAreaJhpCities;

  constructor(protected areaService: AreaJhpCitiesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.areaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'areaListModification',
        content: 'Deleted an area'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-area-jhp-cities-delete-popup',
  template: ''
})
export class AreaJhpCitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ area }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AreaJhpCitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.area = area;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/area-jhp-cities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/area-jhp-cities', { outlets: { popup: null } }]);
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
