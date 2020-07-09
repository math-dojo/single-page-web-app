import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAuthoringPageComponent } from './question-authoring-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';


describe('QuestionAuthoringPageComponent', () => {
  let component: QuestionAuthoringPageComponent;
  let fixture: ComponentFixture<QuestionAuthoringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAuthoringPageComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [
        ClarityModule,
        RouterTestingModule,
        ReactiveFormsModule,
        KatexModule
      ],
    })
      .overrideComponent(QuestionAuthoringPageComponent, {
        set: {
          providers: [
            { provide: QuestionService, useValue: QuestionServiceStub }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(QuestionAuthoringPageComponent);
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
