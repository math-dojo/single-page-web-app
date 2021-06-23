import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';

import { MtdjHeaderComponent } from './mtdj-header.component';

describe('MtdjHeaderComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
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
