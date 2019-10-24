import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CountryJhpCitiesDeleteDialogComponent } from 'app/entities/country-jhp-cities/country-jhp-cities-delete-dialog.component';
import { CountryJhpCitiesService } from 'app/entities/country-jhp-cities/country-jhp-cities.service';

describe('Component Tests', () => {
  describe('CountryJhpCities Management Delete Component', () => {
    let comp: CountryJhpCitiesDeleteDialogComponent;
    let fixture: ComponentFixture<CountryJhpCitiesDeleteDialogComponent>;
    let service: CountryJhpCitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CountryJhpCitiesDeleteDialogComponent]
      })
        .overrideTemplate(CountryJhpCitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryJhpCitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryJhpCitiesService);
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
