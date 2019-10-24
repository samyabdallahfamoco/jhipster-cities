import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { CityJhpCitiesDetailComponent } from 'app/entities/city-jhp-cities/city-jhp-cities-detail.component';
import { CityJhpCities } from 'app/shared/model/city-jhp-cities.model';

describe('Component Tests', () => {
  describe('CityJhpCities Management Detail Component', () => {
    let comp: CityJhpCitiesDetailComponent;
    let fixture: ComponentFixture<CityJhpCitiesDetailComponent>;
    const route = ({ data: of({ city: new CityJhpCities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [CityJhpCitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CityJhpCitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CityJhpCitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.city).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
