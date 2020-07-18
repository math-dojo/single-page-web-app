import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createStubInstance, SinonStubbedInstance } from 'sinon';
import { of } from 'rxjs';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionAuthoringPageComponent } from './question-authoring-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';
import { TopicDto } from 'src/app/models/topic-dto';
import { QuestionDto } from 'src/app/models/question-dto';
import { QuestionTitleValidator } from './question-title.validator';


describe('QuestionAuthoringPageComponent', () => {
  let component: QuestionAuthoringPageComponent;
  let fixture: ComponentFixture<QuestionAuthoringPageComponent>;
  let questionServiceStub: SinonStubbedInstance<QuestionService>;

  beforeEach(async(() => {
    questionServiceStub = createStubInstance(QuestionService);
    questionServiceStub.getTopics.returns(of([TopicDto.createDtoWithNonEmptyFields()]));
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
            { provide: QuestionService, useValue: questionServiceStub },
            { provide: QuestionTitleValidator }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(QuestionAuthoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Setup all scenarios so that question title validation returns no errors
    // unless otherwise specified
    questionServiceStub.getQuestionWithTitle.returns(of(null));
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

  describe('Input Validation', () => {
    it('should allow a new question title that also meets the 64 chars length restriction', () => {
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title input'));
      const inputQuestionTitle = 'a question title that is very exactly sixty-four characters long';

      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

      expect(fixture.componentInstance.newQuestionForm.controls[controlName].value).toEqual(inputQuestionTitle);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].valid).toBe(true);
    });

    it('should show an error if the question title is more than 64 chars', () => {
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title input'));
      const inputQuestionTitle = 'a question title that is very exactly sixty-four characters long';
      const longerQuestionTitle = `${inputQuestionTitle} more stuff`;
      inputFormElement.nativeElement.value = longerQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

      fixture.detectChanges();

      expect(fixture.componentInstance.newQuestionForm.controls[controlName].value).toEqual(longerQuestionTitle);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].invalid).toBe(true);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].errors.maxlength).toBeTruthy();

      // TODO: #41 Test rendering of clarity validation error in unit tests
      /*
            const errorDisplayElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title clr-control-error'));
            expect(errorDisplayElement.nativeElement.value).toMatch(/is a required field/); */
    });

    it('should show an error if the question title is empty', () => {
      // Given
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title input'));

      // When
      const inputQuestionTitle = '';
      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

      // Then
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].value).toEqual(inputQuestionTitle);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].invalid).toBe(true);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].errors.required).toBeTruthy();
    });

    it('should show an error if the question title is already taken ', () => {
      // Given
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title input'));
      const inputQuestionTitle = 'title-that-is-already-taken';
      questionServiceStub.getQuestionWithTitle.returns(of(
        new QuestionDto({ title: inputQuestionTitle, parentTopicTitle: 'something' })));

      // When
      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

      // Then
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].value).toEqual(inputQuestionTitle);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].invalid).toBe(true);
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].errors.titleAlreadyExists).toBeTruthy();
      expect(fixture.componentInstance.newQuestionForm.controls[controlName].errors.titleAlreadyExists.errorMessage)
        .toMatch(`a question with title "${inputQuestionTitle}" already exists`);
    });
  });


  // TODO: Write sepearate test case for select option: https://stackoverflow.com/questions/5678210/select-dropdown-menu-option-with-javascript

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
