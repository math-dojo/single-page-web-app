import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';

import { PracticeHomeComponent } from './practice-home.component';

describe('PracticeHomeComponent', () => {
  let component: PracticeHomeComponent;
  let fixture: ComponentFixture<PracticeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeHomeComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [ClarityModule, RouterTestingModule]
    })
    .overrideComponent(PracticeHomeComponent, {
      set: {
        providers: [
          { provide: QuestionService, useValue: QuestionServiceStub }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeHomeComponent);
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
