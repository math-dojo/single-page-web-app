import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';

import { DashboardComponent } from './dashboard.component';
import { MtdgFooterComponent } from '../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../mtdj-header/mtdj-header.component';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [ClarityModule, RouterTestingModule]
    })
    .overrideComponent(DashboardComponent, {
      set: {
        providers: [
          { provide: QuestionService, useValue: QuestionServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
