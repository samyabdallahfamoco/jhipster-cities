import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';
import { ManagerJhpCitiesService } from './manager-jhp-cities.service';

@Component({
  selector: 'jhi-manager-jhp-cities-delete-dialog',
  templateUrl: './manager-jhp-cities-delete-dialog.component.html'
})
export class ManagerJhpCitiesDeleteDialogComponent {
  manager: IManagerJhpCities;

  constructor(
    protected managerService: ManagerJhpCitiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.managerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'managerListModification',
        content: 'Deleted an manager'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-manager-jhp-cities-delete-popup',
  template: ''
})
export class ManagerJhpCitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ manager }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ManagerJhpCitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.manager = manager;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/manager-jhp-cities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/manager-jhp-cities', { outlets: { popup: null } }]);
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
