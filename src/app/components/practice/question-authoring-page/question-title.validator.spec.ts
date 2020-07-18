import { QuestionTitleValidator } from './question-title.validator';
import { TestBed } from '@angular/core/testing';
import { QuestionService } from 'src/app/services/question.service';
import { createStubInstance, SinonStubbedInstance } from 'sinon';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { QuestionDto } from 'src/app/models/question-dto';
import { QuestionServiceError } from 'src/app/services/question-service.error';

describe('QuestionTitleValidator', () => {
  let questionTitleValidator: QuestionTitleValidator;
  let questionServiceStub: SinonStubbedInstance<QuestionService>;

  beforeEach(() => {
    questionServiceStub = createStubInstance(QuestionService);
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        QuestionTitleValidator,
        { provide: QuestionService, useValue: questionServiceStub }
      ]
    });
    questionTitleValidator = TestBed.inject(QuestionTitleValidator);
    // TestBed.inject(QuestionService);
  });

  it('should return null if the value in the control is not an existing question title', () => {
    const testControl = new FormControl('an-unknown-title');
    questionServiceStub.getQuestionWithTitle.returns(of(null));

    const validationResult = questionTitleValidator.validate(testControl) as Observable<ValidationErrors>;
    validationResult.subscribe({
      next: (result) => expect(result).toBe(null, `validation result: ${result} is not null`),
    });
  });

  it('should return an object with a titleAlreadyExists property if the value in control is an existing question title', () => {
    const testControl = new FormControl('an-existing-title');
    questionServiceStub.getQuestionWithTitle.returns(
      of(new QuestionDto({ title: testControl.value, parentTopicTitle: 'something' })));

    const validationResult = questionTitleValidator.validate(testControl) as Observable<ValidationErrors>;
    validationResult.subscribe({
      next: (result) => expect(result.titleAlreadyExists.errorMessage).toMatch(
        `a question with title "${testControl.value}" already exists`),
    });
  });

  it('should return an object with a titleAlreadyExists property if the query via QuestionService fails', () => {
    const testControl = new FormControl('an-existing-title');
    questionServiceStub.getQuestionWithTitle.callsFake(() => throwError(new QuestionServiceError('some error')));

    const validationResult = questionTitleValidator.validate(testControl) as Observable<ValidationErrors>;
    validationResult.subscribe({
      next: (result) => expect(result.titleAlreadyExists.errorMessage).toMatch(
        `the question title "${testControl.value}" could not be verified at this time, please try again later`),
      error: (error => fail(`the error, :${error.message} was unexpected`))
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});