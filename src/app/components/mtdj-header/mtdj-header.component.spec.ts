import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';

import { MtdjHeaderComponent } from './mtdj-header.component';

describe('MtdjHeaderComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdjHeaderComponent, TestHostComponent ],
      imports: [ClarityModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: Are unit tests needed for this component?
  // This test currently fails because it expects the header tag to be used
  // inside a clr-main-container component. In the app the component meets this
  // condition but in its unit tests it wouldn't.

  it('should create', () => {
    expect(component).toBeTruthy();
    const header = fixture.debugElement.query(
      By.css('.header')
    );
    expect(header).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});

@Component({
  template: `
  <clr-main-container class="main-container">
    <app-mtdj-header></app-mtdj-header>
  </clr-main-container>`
})
class TestHostComponent {

}
