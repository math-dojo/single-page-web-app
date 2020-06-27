import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAuthoringPageComponent } from './question-authoring-page.component';

describe('QuestionAuthoringPageComponent', () => {
  let component: QuestionAuthoringPageComponent;
  let fixture: ComponentFixture<QuestionAuthoringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAuthoringPageComponent ]
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
});
