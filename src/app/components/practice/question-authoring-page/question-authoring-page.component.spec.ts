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
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


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

  it('should call its onSubmit method when its form\'s submit event is triggered', () => {
    spyOn(component, 'onSubmit');

    const signupElement: DebugElement = fixture.debugElement;
    const signupFormElement = signupElement.query(By.css('.mtdj__question-auth-input-container form'));

    signupFormElement.triggerEventHandler('submit', null);

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  const parameters = [
    {
      description: 'title input control when text is entered', controlName: 'title',
      cssSelector: '#mtdj__question-auth-input-title input', inputValue: 'something-really-hard'
    },
    {
      description: 'topic input control when text is entered', controlName: 'parentTopicTitle',
      cssSelector: '#mtdj__question-auth-input-topic input', inputValue: 'something-really-hard'
    },
    {
      description: 'body input control when text is entered', controlName: 'body',
      cssSelector: '#mtdj__question-auth-input-body textarea', inputValue: 'some quqestion'
    },
    {
      description: 'sampleAnswer input control when text is entered', controlName: 'sampleAnswer',
      cssSelector: '#mtdj__question-auth-input-sample_answer textarea', inputValue: 'some sample answer'
    }
  ];
  parameters.forEach(({ description, cssSelector, inputValue, controlName }) => {
    it(`should update the value of the ${description}`, () => {
      const inputFormElement = fixture.debugElement.query(By.css(cssSelector));
      const inputQuestionTitle = inputValue;

      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

      expect(fixture.componentInstance.newQuestionForm.controls[controlName].value).toEqual(inputQuestionTitle);
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
