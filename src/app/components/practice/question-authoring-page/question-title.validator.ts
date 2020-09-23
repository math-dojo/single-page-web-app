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
    return this.questionService.getQuestionWithTitle(ctrl.value).pipe(
      shareReplay(1),
      map((questionServiceResponse) => {
        if (questionServiceResponse && (questionServiceResponse.title === ctrl.value)) {
          return this.createQuestionTitleValidationError(`a question with title "${ctrl.value}" already exists`);
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
