import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';

import { TopicPageComponent } from './topic-page.component';
import { MtdgFooterComponent } from '../../mtdg-footer/mtdg-footer.component';
import { MtdjHeaderComponent } from '../../mtdj-header/mtdj-header.component';

describe('TopicPageComponent', () => {
  let component: TopicPageComponent;
  let fixture: ComponentFixture<TopicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPageComponent, MtdgFooterComponent, MtdjHeaderComponent ],
      imports: [ClarityModule, RouterTestingModule]
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
});
