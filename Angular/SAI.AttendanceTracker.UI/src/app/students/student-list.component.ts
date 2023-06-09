import { Component } from "@angular/core";
import { StudentService } from "./student.service";
import { filter, first, map, switchMap, take } from "rxjs";
import { Student } from "./student";


interface OnInit {
};

@Component({
    selector: "sai-students",
    templateUrl: "./student-list.component.html",
})
export class StudentListComponent implements OnInit{
    pageTitle = "Student List"
    students$ = this.studentService.students$
    students: Student[] | undefined
    studentsOriginal: Student[] | undefined;
    studentsUnchanged = true;

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.students$.subscribe(val => {
            this.students = val;
            this.studentsOriginal = val;
        });
    }

    changeStatus(studentID: number): void {
        if(this.students)
        {
            var index = this.students.findIndex(x => x.studentID == studentID)
            if(index >= 0)
            {
                this.studentsUnchanged = false;
                var student = this.students[index];
                switch(student.status)
                {
                    case null:
                    case "Unknown":
                        student.status = "Attended";
                        break;
                    case "Attended":
                        student.status = "Absent";
                        break;
                    case "Absent":
                        student.status = "Excused";
                        break;
                    case "Excused":
                        student.status = "Unknown";
                        break;
                }
            }
        }
        // this.students$.pipe(
        //     map(students => students.findIndex(i => i.studentID == studentID)),
        //     filter(index => index >= 0),
        //     switchMap(index => this.students$.pipe(
        //             map(students => students[index])
        //         )
        //     )
        // ).subscribe(student => {
        //     switch(student.status)
        //     {
        //         case null:
        //         case "Unknown":
        //             student.status = "Attended";
        //             break;
        //         case "Attended":
        //             student.status = "Absent";
        //             break;
        //         case "Absent":
        //             student.status = "Excused";
        //             break;
        //         case "Excused":
        //             student.status = "Unknown";
        //             break;
        //     }
        // })
    }

    saveChanges()
    {
        if(this.students 
            && this.studentsOriginal 
            && this.students.length == this.studentsOriginal.length)
        {
            for(let i = 0; i < this.students.length; i++)
            {
                if(this.studentsOriginal[i].status == null)
                {
                    //add new attendance record
                }
                else if(this.students[i].status != this.studentsOriginal[i].status)
                {
                    //update attendance record
                }
            }
        }
    }
}
