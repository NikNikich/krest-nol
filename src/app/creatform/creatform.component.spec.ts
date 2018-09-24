import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatFormComponent } from './creatform.component';

describe(' CreatFormComponent', () => {
  let component:  CreatFormComponent;
  let fixture: ComponentFixture< CreatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  CreatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( CreatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
