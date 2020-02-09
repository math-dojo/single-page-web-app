import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtdjHeaderComponent } from './mtdj-header.component';

describe('MtdjHeaderComponent', () => {
  let component: MtdjHeaderComponent;
  let fixture: ComponentFixture<MtdjHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdjHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdjHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
