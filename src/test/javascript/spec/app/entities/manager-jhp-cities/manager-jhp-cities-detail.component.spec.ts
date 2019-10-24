import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterCitiesTestModule } from '../../../test.module';
import { ManagerJhpCitiesDetailComponent } from 'app/entities/manager-jhp-cities/manager-jhp-cities-detail.component';
import { ManagerJhpCities } from 'app/shared/model/manager-jhp-cities.model';

describe('Component Tests', () => {
  describe('ManagerJhpCities Management Detail Component', () => {
    let comp: ManagerJhpCitiesDetailComponent;
    let fixture: ComponentFixture<ManagerJhpCitiesDetailComponent>;
    const route = ({ data: of({ manager: new ManagerJhpCities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterCitiesTestModule],
        declarations: [ManagerJhpCitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ManagerJhpCitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ManagerJhpCitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.manager).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
