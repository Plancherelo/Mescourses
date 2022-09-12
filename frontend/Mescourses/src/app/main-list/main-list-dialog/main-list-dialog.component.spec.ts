import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListDialogComponent } from './main-list-dialog.component';

describe('MainListDialogComponent', () => {
  let component: MainListDialogComponent;
  let fixture: ComponentFixture<MainListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
