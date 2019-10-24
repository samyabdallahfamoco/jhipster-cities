import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CityJhpCitiesDeleteDialogComponent } from 'app/entities/city-jhp-cities/city-jhp-cities-delete-dialog.component';
import { CityJhpCitiesService } from 'app/entities/city-jhp-cities/city-jhp-cities.service';

describe('Component Tests', () => {
  describe('CityJhpCities Management Delete Component', () => {
    let comp: CityJhpCitiesDeleteDialogComponent;
    let fixture: ComponentFixture<CityJhpCitiesDeleteDialogComponent>;
    let service: CityJhpCitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CityJhpCitiesDeleteDialogComponent]
      })
        .overrideTemplate(CityJhpCitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CityJhpCitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityJhpCitiesService);
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
