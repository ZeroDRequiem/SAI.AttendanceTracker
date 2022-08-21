import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNotesComponent } from './student-notes.component';

describe('StudentNotesComponent', () => {
  let component: StudentNotesComponent;
  let fixture: ComponentFixture<StudentNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
