import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { QuestionPageComponent } from './question-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionPageComponent', () => {
  let component: QuestionPageComponent;
  let fixture: ComponentFixture<QuestionPageComponent>;

  beforeEach(async(() => {
    const testActivatedRoute = new ActivatedRouteStub({
      question: 'some-question-title'});

    TestBed.configureTestingModule({
      declarations: [QuestionPageComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [ClarityModule,
        RouterTestingModule,
        ReactiveFormsModule]
    })
    .overrideComponent(QuestionPageComponent, {
      set: {
        providers: [
          { provide: QuestionService, useValue: QuestionServiceStub },
          { provide: ActivatedRoute, useValue: testActivatedRoute }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
