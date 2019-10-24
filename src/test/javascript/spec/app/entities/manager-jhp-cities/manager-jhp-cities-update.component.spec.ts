import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { ManagerJhpCitiesUpdateComponent } from 'app/entities/manager-jhp-cities/manager-jhp-cities-update.component';
import { ManagerJhpCitiesService } from 'app/entities/manager-jhp-cities/manager-jhp-cities.service';
import { ManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

describe('Component Tests', () => {
  describe('ManagerJhpCities Management Update Component', () => {
    let comp: ManagerJhpCitiesUpdateComponent;
    let fixture: ComponentFixture<ManagerJhpCitiesUpdateComponent>;
    let service: ManagerJhpCitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [ManagerJhpCitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ManagerJhpCitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ManagerJhpCitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ManagerJhpCitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ManagerJhpCities(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ManagerJhpCities();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
