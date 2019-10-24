import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { AreaJhpCitiesDetailComponent } from 'app/entities/area-jhp-cities/area-jhp-cities-detail.component';
import { AreaJhpCities } from 'app/shared/model/area-jhp-cities.model';

describe('Component Tests', () => {
  describe('AreaJhpCities Management Detail Component', () => {
    let comp: AreaJhpCitiesDetailComponent;
    let fixture: ComponentFixture<AreaJhpCitiesDetailComponent>;
    const route = ({ data: of({ area: new AreaJhpCities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [AreaJhpCitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AreaJhpCitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AreaJhpCitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.area).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
