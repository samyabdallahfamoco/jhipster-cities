import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CityJhpCitiesUpdateComponent } from 'app/entities/city-jhp-cities/city-jhp-cities-update.component';
import { CityJhpCitiesService } from 'app/entities/city-jhp-cities/city-jhp-cities.service';
import { CityJhpCities } from 'app/shared/model/city-jhp-cities.model';

describe('Component Tests', () => {
  describe('CityJhpCities Management Update Component', () => {
    let comp: CityJhpCitiesUpdateComponent;
    let fixture: ComponentFixture<CityJhpCitiesUpdateComponent>;
    let service: CityJhpCitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CityJhpCitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CityJhpCitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CityJhpCitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CityJhpCitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CityJhpCities(123);
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
        const entity = new CityJhpCities();
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
