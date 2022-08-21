import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StudentsNotesQuery } from '../../queries/students-notes.query';
import { StudentsQuery } from '../../queries/students.query';
import { StudentsNotesService } from '../../services/students-notes.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsNotesService: StudentsNotesService,
    private studentsNotesQuery: StudentsNotesQuery,
    private studentsService: StudentsService,
    private studentsQuery: StudentsQuery
  ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {

        let id = params.get('id');

        if (!id) {
          return throwError("id was not specified in route.");
        }

        let studentId = id as string;

        return this.studentsService.getById(studentId)
      }))
      .subscribe(result => {

      }, error => {

        // either there was no id specified in route, or api threw an error.
        // redirect to 404 page.
        this.router.navigate([`./not-found`]);
      });

  }

}
