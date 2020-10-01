import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeHomeComponent } from './practice-home.component';

describe('PracticeHomeComponent', () => {
  let component: PracticeHomeComponent;
  let fixture: ComponentFixture<PracticeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeHomeComponent ]
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
});
