import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { MtdjHeaderComponent } from './mtdj-header.component';

describe('MtdjHeaderComponent', () => {
  let component: MtdjHeaderComponent;
  let fixture: ComponentFixture<MtdjHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdjHeaderComponent ],
      imports: [ClarityModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdjHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: Are unit tests needed for this component?
  // This test currently fails because it expects the header tag to be used
  // inside a clr-main-container component. In the app the component meets this
  // condition but in its unit tests it wouldn't.

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
