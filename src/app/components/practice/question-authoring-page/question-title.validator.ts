import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { QuestionService } from 'src/app/services/question.service';

@Injectable({ providedIn: 'root' })
export class QuestionTitleValidator implements AsyncValidator {
  constructor(private questionService: QuestionService) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const titleToValidate = ctrl.value as string;
    return this.questionService.searchForQuestionBy({title: titleToValidate}).pipe(
      shareReplay(1),
      map((questionServiceResponse) => {
        if (questionServiceResponse
          && (questionServiceResponse.questions.length > 0)
          && (questionServiceResponse.questions[0].title === titleToValidate)) {
          return this.createQuestionTitleValidationError(`a question with title "${titleToValidate}" already exists`);
        }
        return null;
      }),
      catchError((error) => {
        // log this error appropriately
        return of(this.createQuestionTitleValidationError(
          `the question title "${ctrl.value}" could not be verified at this time, please try again later`));
      })
    );
  }

  private createQuestionTitleValidationError(errorMessage: string) {
    return {
      titleAlreadyExists: {
        errorMessage
      }
    };
  }
}
