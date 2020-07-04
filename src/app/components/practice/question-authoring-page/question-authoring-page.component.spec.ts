import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAuthoringPageComponent } from './question-authoring-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('QuestionAuthoringPageComponent', () => {
  let component: QuestionAuthoringPageComponent;
  let fixture: ComponentFixture<QuestionAuthoringPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAuthoringPageComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(QuestionAuthoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should return false', () => {
  //   let testStringArray : string[] = ["test1" , "", ""]
  //   expect(component.customOptionsValidator(testStringArray)).toBeFalsy;
  // });
  // it('should return true', () => {
  //   let testStringArray : string[] = ["test1" , "test2", "test3"]
  //   expect(component.customOptionsValidator(testStringArray)).toBeTruthy;
  // });
});
