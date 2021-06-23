import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';

import { PracticeComponent } from './practice.component';
import { MtdgFooterComponent } from '../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../mtdj-header/mtdj-header.component';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [ClarityModule, RouterTestingModule]
    })
    .overrideComponent(PracticeComponent, {
      set: {
        providers: [
          { provide: QuestionService, useValue: QuestionServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
