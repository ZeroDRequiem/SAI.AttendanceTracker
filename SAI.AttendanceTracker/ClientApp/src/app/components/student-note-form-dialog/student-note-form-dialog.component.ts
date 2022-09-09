import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentNoteFormDialogData } from './student-note-form-dialog.data';

@Component({
  selector: 'app-student-note-form-dialog',
  templateUrl: './student-note-form-dialog.component.html',
  styleUrls: ['./student-note-form-dialog.component.scss']
})
export class StudentNoteFormDialogComponent implements OnInit {

  form = this.fb.group({
    note: [this.data?.note, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StudentNoteFormDialogData,
    private dialogRef: MatDialogRef<StudentNoteFormDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit(): void {

    this.dialogRef.close(this.form.value);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
