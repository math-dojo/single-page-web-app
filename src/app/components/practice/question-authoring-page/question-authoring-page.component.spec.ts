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

  describe('Input controls', () => {
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
      },
      {
        description: 'answer input control when text is entered', controlName: 'answer',
        cssSelector: '#mtdj__question-auth-input-answer textarea', inputValue: 'some correct answer'
      },
      {
        description: 'hint1 input control when text is entered', controlName: 'hint1',
        cssSelector: '#mtdj__question-auth-input-hint1 input', inputValue: 'some hint'
      },
      {
        description: 'hint2 input control when text is entered', controlName: 'hint2',
        cssSelector: '#mtdj__question-auth-input-hint2 input', inputValue: 'some hint'
      },
      {
        description: 'hint3 input control when text is entered', controlName: 'hint3',
        cssSelector: '#mtdj__question-auth-input-hint3 input', inputValue: 'some hint'
      },
      {
        description: 'option1 input control when text is entered', controlName: 'option1',
        cssSelector: '#mtdj__question-auth-input-option1 input', inputValue: 'some option'
      },
      {
        description: 'option2 input control when text is entered', controlName: 'option2',
        cssSelector: '#mtdj__question-auth-input-option2 input', inputValue: 'some option'
      },
      {
        description: 'option3 input control when text is entered', controlName: 'option3',
        cssSelector: '#mtdj__question-auth-input-option3 input', inputValue: 'some option'
      },
      {
        description: 'option4 input control when text is entered', controlName: 'option4',
        cssSelector: '#mtdj__question-auth-input-option4 input', inputValue: 'some option'
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
  });


  //TODO: Write sepearate test case for select option: https://stackoverflow.com/questions/5678210/select-dropdown-menu-option-with-javascript

  let a = 0;
  afterEach(() => {
    a++;
    console.log(`I run for the ${a}st/th time`);
    TestBed.resetTestingModule();
  });

});
