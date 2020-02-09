import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtdgFooterComponent } from './mtdg-footer.component';

describe('MtdgFooterComponent', () => {
  let component: MtdgFooterComponent;
  let fixture: ComponentFixture<MtdgFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdgFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdgFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
