import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { AreaJhpCitiesUpdateComponent } from 'app/entities/area-jhp-cities/area-jhp-cities-update.component';
import { AreaJhpCitiesService } from 'app/entities/area-jhp-cities/area-jhp-cities.service';
import { AreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

describe('Component Tests', () => {
  describe('AreaJhpCities Management Update Component', () => {
    let comp: AreaJhpCitiesUpdateComponent;
    let fixture: ComponentFixture<AreaJhpCitiesUpdateComponent>;
    let service: AreaJhpCitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [AreaJhpCitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AreaJhpCitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AreaJhpCitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AreaJhpCitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AreaJhpCities(123);
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
        const entity = new AreaJhpCities();
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
