import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';

import { TopicPageComponent } from './topic-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionServiceStub } from 'src/testing/question.service.stub';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';

describe('TopicPageComponent', () => {
  let component: TopicPageComponent;
  let fixture: ComponentFixture<TopicPageComponent>;

  beforeEach(async(() => {
    const testActivatedRoute = new ActivatedRouteStub({ topic: 'some-topic-title' });
    TestBed.configureTestingModule({
      declarations: [TopicPageComponent, MtdgFooterComponent, MtdjHeaderComponent],
      imports: [ClarityModule, RouterTestingModule]
    })
      .overrideComponent(TopicPageComponent, {
        set: {
          providers: [
            { provide: QuestionService, useValue: QuestionServiceStub },
            { provide: ActivatedRoute, useValue: testActivatedRoute }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPageComponent);
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
