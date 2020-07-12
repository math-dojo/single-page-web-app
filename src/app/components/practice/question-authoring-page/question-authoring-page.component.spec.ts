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

  afterEach(() => {
    TestBed.resetTestingModule();
  });

});
