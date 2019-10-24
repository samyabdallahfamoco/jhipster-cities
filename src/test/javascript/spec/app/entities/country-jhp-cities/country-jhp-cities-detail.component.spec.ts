import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CountryJhpCitiesDetailComponent } from 'app/entities/country-jhp-cities/country-jhp-cities-detail.component';
import { CountryJhpCities } from 'app/shared/model/country-jhp-cities.model';

describe('Component Tests', () => {
  describe('CountryJhpCities Management Detail Component', () => {
    let comp: CountryJhpCitiesDetailComponent;
    let fixture: ComponentFixture<CountryJhpCitiesDetailComponent>;
    const route = ({ data: of({ country: new CountryJhpCities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CountryJhpCitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CountryJhpCitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryJhpCitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
