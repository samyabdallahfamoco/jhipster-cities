import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { ManagerJhpCitiesDeleteDialogComponent } from 'app/entities/manager-jhp-cities/manager-jhp-cities-delete-dialog.component';
import { ManagerJhpCitiesService } from 'app/entities/manager-jhp-cities/manager-jhp-cities.service';

describe('Component Tests', () => {
  describe('ManagerJhpCities Management Delete Component', () => {
    let comp: ManagerJhpCitiesDeleteDialogComponent;
    let fixture: ComponentFixture<ManagerJhpCitiesDeleteDialogComponent>;
    let service: ManagerJhpCitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [ManagerJhpCitiesDeleteDialogComponent]
      })
        .overrideTemplate(ManagerJhpCitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ManagerJhpCitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ManagerJhpCitiesService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
