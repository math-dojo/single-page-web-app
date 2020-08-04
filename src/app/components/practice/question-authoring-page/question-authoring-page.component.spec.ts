import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createStubInstance, SinonStubbedInstance } from 'sinon';
import { of, throwError } from 'rxjs';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionAuthoringPageComponent } from './question-authoring-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';
import { TopicDto } from 'src/app/models/topic-dto';
import { QuestionDto } from 'src/app/models/question-dto';
import { QuestionTitleValidator } from './question-title.validator';
import { Difficulty } from 'src/app/models/question_difficulty';
import { QuestionServiceError } from 'src/app/services/question-service.error';
import { MathDojoError } from 'src/app/models/math-dojo.error';

describe('QuestionAuthoringPageComponent', () => {
  let component: QuestionAuthoringPageComponent;
  let fixture: ComponentFixture<QuestionAuthoringPageComponent>;
  let questionServiceStub: SinonStubbedInstance<QuestionService>;

  beforeEach(async(() => {
    questionServiceStub = createStubInstance(QuestionService);
    questionServiceStub.getTopics.returns(
      of([TopicDto.createDtoWithNonEmptyFields()])
    );
    TestBed.configureTestingModule({
      declarations: [
        QuestionAuthoringPageComponent,
        MtdgFooterComponent,
        MtdjHeaderComponent,
      ],
      imports: [ClarityModule, ReactiveFormsModule, KatexModule],
    })
      .overrideComponent(QuestionAuthoringPageComponent, {
        set: {
          providers: [
            { provide: QuestionService, useValue: questionServiceStub },
            { provide: QuestionTitleValidator },
          ],
        },
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

  describe('Input controls', () => {
    const parameters = [
      {
        description: 'topic input control when text is entered',
        controlName: 'parentTopicTitle',
        cssSelector: '#mtdj__question-auth-input-topic input',
        inputValue: 'something-really-hard',
      },
      {
        description: 'body input control when text is entered',
        controlName: 'body',
        cssSelector: '#mtdj__question-auth-input-body textarea',
        inputValue: 'some quqestion',
      },
      {
        description: 'sampleAnswer input control when text is entered',
        controlName: 'sampleAnswer',
        cssSelector: '#mtdj__question-auth-input-sample_answer textarea',
        inputValue: 'some sample answer',
      },
      {
        description: 'answer input control when text is entered',
        controlName: 'answer',
        cssSelector: '#mtdj__question-auth-input-answer textarea',
        inputValue: 'some correct answer',
      },
      {
        description: 'hint1 input control when text is entered',
        controlName: 'hint1',
        cssSelector: '#mtdj__question-auth-input-hint1 input',
        inputValue: 'some hint',
      },
      {
        description: 'hint2 input control when text is entered',
        controlName: 'hint2',
        cssSelector: '#mtdj__question-auth-input-hint2 input',
        inputValue: 'some hint',
      },
      {
        description: 'hint3 input control when text is entered',
        controlName: 'hint3',
        cssSelector: '#mtdj__question-auth-input-hint3 input',
        inputValue: 'some hint',
      },
      {
        description: 'option1 input control when text is entered',
        controlName: 'option1',
        cssSelector: '#mtdj__question-auth-input-option1 input',
        inputValue: 'some option',
      },
      {
        description: 'option2 input control when text is entered',
        controlName: 'option2',
        cssSelector: '#mtdj__question-auth-input-option2 input',
        inputValue: 'some option',
      },
      {
        description: 'option3 input control when text is entered',
        controlName: 'option3',
        cssSelector: '#mtdj__question-auth-input-option3 input',
        inputValue: 'some option',
      },
      {
        description: 'option4 input control when text is entered',
        controlName: 'option4',
        cssSelector: '#mtdj__question-auth-input-option4 input',
        inputValue: 'some option',
      },
    ];
    parameters.forEach(
      ({ description, cssSelector, inputValue, controlName }) => {
        it(`should update the value of the ${description}`, () => {
          const inputFormElement = fixture.debugElement.query(
            By.css(cssSelector)
          );
          const inputQuestionTitle = inputValue;

          inputFormElement.nativeElement.value = inputQuestionTitle;
          inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));

          expect(
            fixture.componentInstance.newQuestionForm.controls[controlName]
              .value
          ).toEqual(inputQuestionTitle);
        });
      }
    );
  });

  describe('Question Title Validation', () => {
    it('should allow a new question title that also meets the 64 chars length restriction', () => {
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(
        By.css('#mtdj__question-auth-input-title input')
      );
      const inputQuestionTitle =
        'a question title that is very exactly sixty-four characters long';

      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
      inputFormElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].value
      ).toEqual(inputQuestionTitle);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].valid
      ).toBe(true);
    });

    it('should show an error if the question title is more than 64 chars', () => {
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(
        By.css('#mtdj__question-auth-input-title input')
      );
      const inputQuestionTitle =
        'a question title that is very exactly sixty-four characters long';
      const longerQuestionTitle = `${inputQuestionTitle} more stuff`;

      inputFormElement.nativeElement.value = longerQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
      inputFormElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].value
      ).toEqual(longerQuestionTitle);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].invalid
      ).toBe(true);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].errors
          .maxlength
      ).toBeTruthy();

      // TODO: #41 Test rendering of clarity validation error in unit tests
      /*
            const errorDisplayElement = fixture.debugElement.query(By.css('#mtdj__question-auth-input-title clr-control-error'));
            expect(errorDisplayElement.nativeElement.value).toMatch(/is a required field/); */
    });

    it('should show an error if the question title is empty', () => {
      // Given
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(
        By.css('#mtdj__question-auth-input-title input')
      );

      // When
      const inputQuestionTitle = '';
      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
      inputFormElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      // Then
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].value
      ).toEqual(inputQuestionTitle);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].invalid
      ).toBe(true);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].errors
          .required
      ).toBeTruthy();
    });

    it('should show an error if the question title is already taken ', () => {
      // Given
      const controlName = 'title';
      const inputFormElement = fixture.debugElement.query(
        By.css('#mtdj__question-auth-input-title input')
      );
      const inputQuestionTitle = 'title-that-is-already-taken';
      questionServiceStub.getQuestionWithTitle.returns(
        of(
          new QuestionDto({
            title: inputQuestionTitle,
            parentTopicTitle: 'something',
          })
        )
      );

      // When
      inputFormElement.nativeElement.value = inputQuestionTitle;
      inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
      inputFormElement.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      // Then
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].value
      ).toEqual(inputQuestionTitle);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].invalid
      ).toBe(true);
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].errors
          .titleAlreadyExists
      ).toBeTruthy();
      expect(
        fixture.componentInstance.newQuestionForm.controls[controlName].errors
          .titleAlreadyExists.errorMessage
      ).toMatch(`a question with title "${inputQuestionTitle}" already exists`);
    });
  });

  describe('Question Form', () => {
    it('should be valid when title, topic, difficulty, body and answer are valid', () => {
      expect(fixture.componentInstance.newQuestionForm.invalid).toBe(true);

      fixture.componentInstance.newQuestionForm.controls.title.setValue(
        'some-untaken-title'
      );

      fixture.componentInstance.newQuestionForm.controls.parentTopicTitle.setValue(
        'some-existing-topic'
      );

      fixture.componentInstance.newQuestionForm.controls.difficulty.setValue(
        Difficulty.Difficult
      );

      fixture.componentInstance.newQuestionForm.controls.body.setValue(
        ' some stuff that will go in a question'
      );

      fixture.componentInstance.newQuestionForm.controls.answer.setValue(
        ' some stuff that will go in an answer'
      );

      expect(fixture.componentInstance.newQuestionForm.valid).toBe(true);
    });
  });

  describe('Question Form Submission', () => {
    it('calling the submit handler when the form is not valid should throw an error', () => {
      // Given
      const signupElement: DebugElement = fixture.debugElement;

      expect(fixture.componentInstance.newQuestionForm.invalid).toBe(
        true,
        'the question form was expected to be invalid but it was not'
      );

      // Then
      expect(() => component.onSubmit()).toThrowError(
        MathDojoError,
        'the form cannot be submitted when it is invalid'
      );
    });

    it('should set the successfulFormSubmission property as true and reset the form if submitted successfully', fakeAsync(() => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.fixture.detectChanges();
      const undefinedCheckSubscription = page.componentInstanceUnderTest.successfulFormSubmission$.subscribe(
        {
          next: (value) =>
            expect(value).toBeUndefined(
              'the successfulFormSubmission property was not initially undefined'
            ),
          error: (error) =>
            fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
        }
      );

      tick();
      page.fixture.detectChanges();
      undefinedCheckSubscription.unsubscribe();

      const submitMethodSpy = spyOn(
        page.componentInstanceUnderTest,
        'onSubmit'
      ).and.callThrough();
      const formResetSpy = spyOn(
        page.componentInstanceUnderTest.newQuestionForm,
        'reset'
      ).and.callThrough();
      questionServiceStub.postQuestionToQuarantine.returns(of(''));

      // When
      page.fillFormCorrectly();
      page.fixture.detectChanges();
      tick();
      page.raiseFormSubmitEvent();

      // Then
      expect(submitMethodSpy).toHaveBeenCalledTimes(1);
      page.componentInstanceUnderTest.successfulFormSubmission$.subscribe({
        next: (value) => {
          expect(value.status).toBe(
            true,
            `expected the successfulSubmissionForm status to be true but it was ${value}`
          );
          expect(formResetSpy).toHaveBeenCalledTimes(1);
        },
        error: (error) =>
          fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
      });
      flush();
    }));

    it('should set the successfulFormSubmission property as false and not reset the form if submission fails', fakeAsync(() => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.fixture.detectChanges();
      const undefinedCheckSubscription = page.componentInstanceUnderTest.successfulFormSubmission$.subscribe(
        {
          next: (value) =>
            expect(value).toBeUndefined(
              'the successfulFormSubmission property was not initially undefined'
            ),
          error: (error) =>
            fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
        }
      );

      tick();
      page.fixture.detectChanges();
      undefinedCheckSubscription.unsubscribe();

      const submitMethodSpy = spyOn(
        page.componentInstanceUnderTest,
        'onSubmit'
      ).and.callThrough();
      const formResetSpy = spyOn(
        page.componentInstanceUnderTest.newQuestionForm,
        'reset'
      ).and.callThrough();

      questionServiceStub.postQuestionToQuarantine.callsFake(() =>
        throwError(new QuestionServiceError('some error cause'))
      );

      // When
      page.fillFormCorrectly();
      page.fixture.detectChanges();
      tick();
      page.raiseFormSubmitEvent();

      // Then
      expect(submitMethodSpy).toHaveBeenCalledTimes(1);
      page.componentInstanceUnderTest.successfulFormSubmission$.subscribe({
        next: (value) => {
          expect(value.status).toBe(
            false,
            `expected the successfulSubmissionForm status to be false but it was ${value}`
          );
          expect(formResetSpy).toHaveBeenCalledTimes(0);
        },
        error: (error) =>
          fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
      });
      flush();
    }));
  });

  describe('Alerts', () => {
    it('should not show when the page is initialised', () => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeNull('the page error alert can be seen');
    });

    it('should show only the success alert when the successfulFormSubmission$ is true', () => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: true,
      });

      page.fixture.detectChanges();

      expect(page.successAlert).toBeTruthy(
        'the page success alert cannot be seen'
      );
      expect(page.errorAlert).toBeNull('the page error alert can be seen');
    });

    it('should show only the failure alert when the successfulFormSubmission$ is false', () => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: false,
      });

      // When
      page.fixture.detectChanges();

      // Then
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeTruthy('the page error alert cannot be seen');
    });

    it('should reset the successfulFormSubmission$ observable when the error alert is closed', (done) => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: false,
      });
      page.fixture.detectChanges();
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeTruthy('the page error alert cannot be seen');

      // When
      page.errorAlertCloseButton.triggerEventHandler('click', null);
      page.fixture.detectChanges();

      // Then
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeNull('the page error alert can be seen');
      page.componentInstanceUnderTest.successfulFormSubmission$.subscribe(
        {
          next: (value) => {
            expect(value).toBeUndefined(
              'the successfulFormSubmission property was not set to undefined'
            );
            done();
          },
          error: (error) =>
            fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
        }
      );
    });

    it('should reset the successfulFormSubmission$ observable when the success alert is closed', (done) => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: true,
      });
      page.fixture.detectChanges();
      expect(page.successAlert).toBeTruthy(
        'the page success alert cannot be seen'
      );
      expect(page.errorAlert).toBeNull('the page error alert can be seen');

      // When
      page.successAlertCloseButton.triggerEventHandler('click', null);
      page.fixture.detectChanges();

      // Then
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeNull('the page error alert can be seen');
      page.componentInstanceUnderTest.successfulFormSubmission$.subscribe(
        {
          next: (value) => {
            expect(value).toBeUndefined(
              'the successfulFormSubmission property was not set to undefined'
            );
            done();
          },
          error: (error) =>
            fail(`an unexpected error was thrown: ${JSON.stringify(error)}`),
        }
      );
    });

    it('should display a different alert if the submission status changes', () => {
      // Given
      const page = new QuestionAuthoringTestPage(fixture);
      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: false,
      });
      page.fixture.detectChanges();
      expect(page.successAlert).toBeNull('the page success alert can be seen');
      expect(page.errorAlert).toBeTruthy('the page error alert cannot be seen');

      page.componentInstanceUnderTest.successfulFormSubmission$ = of({
        status: true,
      });

      // When
      page.fixture.detectChanges();

      // Then
      expect(page.successAlert).toBeTruthy(
        'the page success alert cannot be seen'
      );
      expect(page.errorAlert).toBeNull('the page error alert can be seen');
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});

/**
 * Test class containing utility methods for a number of operations on the page
 */
class QuestionAuthoringTestPage {
  public readonly fixture: ComponentFixture<QuestionAuthoringPageComponent>;
  public readonly componentInstanceUnderTest: QuestionAuthoringPageComponent;
  private readonly questionAuthoringFormElement: DebugElement;

  /**
   * Creates an instance of the page from fixture under test
   */
  constructor(
    fixtureUnderTest: ComponentFixture<QuestionAuthoringPageComponent>
  ) {
    this.fixture = fixtureUnderTest;
    this.componentInstanceUnderTest = fixtureUnderTest.componentInstance;
    this.questionAuthoringFormElement = fixtureUnderTest.debugElement.query(
      By.css('.mtdj__question-auth-input-container form')
    );
  }

  fillFormCorrectly() {
    expect(this.componentInstanceUnderTest.newQuestionForm.invalid).toBe(
      true,
      'the form was not initially empty'
    );

    this.componentInstanceUnderTest.newQuestionForm.controls.title.setValue(
      'some-untaken-title'
    );

    this.componentInstanceUnderTest.newQuestionForm.controls.parentTopicTitle.setValue(
      'some-existing-topic'
    );

    this.componentInstanceUnderTest.newQuestionForm.controls.difficulty.setValue(
      Difficulty.Difficult
    );

    this.componentInstanceUnderTest.newQuestionForm.controls.body.setValue(
      'some stuff that will go in a question'
    );

    this.componentInstanceUnderTest.newQuestionForm.controls.answer.setValue(
      'some stuff that will go in an answer'
    );
  }

  raiseFormSubmitEvent() {
    this.questionAuthoringFormElement.triggerEventHandler('submit', null);
  }

  get successAlert(): DebugElement {
    return this.fixture.debugElement.query(
      By.css('.mtdj__question-auth-input-container .alert.alert-success')
    );
  }

  get errorAlert(): DebugElement {
    return this.fixture.debugElement.query(
      By.css('.mtdj__question-auth-input-container .alert.alert-danger')
    );
  }

  get successAlertCloseButton(): DebugElement {
    return this.successAlert.query(
      By.css('button.close')
    );
  }

  get errorAlertCloseButton(): DebugElement {
    return this.errorAlert.query(
      By.css('button.close')
    );
  }
}
