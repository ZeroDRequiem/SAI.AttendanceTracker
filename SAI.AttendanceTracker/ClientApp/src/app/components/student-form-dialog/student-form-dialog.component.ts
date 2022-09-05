import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentFormDialogData } from './student-form-dialog.data';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent implements OnInit {

  studentForm = this.fb.group({
    firstName: [this.data?.firstName, Validators.required],
    lastName: [this.data?.lastName, Validators.required],
    middleName: this.data?.middleName
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StudentFormDialogData,
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit(): void {

    this.dialogRef.close(this.studentForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
