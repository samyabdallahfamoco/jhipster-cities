import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CountryJhpCitiesUpdateComponent } from 'app/entities/country-jhp-cities/country-jhp-cities-update.component';
import { CountryJhpCitiesService } from 'app/entities/country-jhp-cities/country-jhp-cities.service';
import { CountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

describe('Component Tests', () => {
  describe('CountryJhpCities Management Update Component', () => {
    let comp: CountryJhpCitiesUpdateComponent;
    let fixture: ComponentFixture<CountryJhpCitiesUpdateComponent>;
    let service: CountryJhpCitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CountryJhpCitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CountryJhpCitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryJhpCitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryJhpCitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CountryJhpCities(123);
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
        const entity = new CountryJhpCities();
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
