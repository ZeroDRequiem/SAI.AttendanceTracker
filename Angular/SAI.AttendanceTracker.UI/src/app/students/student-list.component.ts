import { Component } from "@angular/core";
import { StudentService } from "./student.service";
import { filter, first, map, switchMap, take } from "rxjs";
import { StudentAttendance } from "./studentAttendance";
import { Attendance } from "../attendance/attendance";


interface OnInit {
};

@Component({
    selector: "sai-students",
    templateUrl: "./student-list.component.html",
})
export class StudentListComponent implements OnInit{
    pageTitle = "Student List"
    students$ = this.studentService.students$
    students: StudentAttendance[] | undefined
    studentsOriginal: StudentAttendance[] | undefined;
    studentsUnchanged = true;
    attendanceDate = new Date("05/28/2023");

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.students$.subscribe(val => this.students = val);
        this.students$.subscribe(val => this.studentsOriginal = val);
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
    }

    jsonDate() : string
    {
        var date = this.attendanceDate.getFullYear().toString() + "-";
        var month = this.attendanceDate.getMonth() + 1;
        if(month < 10)
        {
            date += "0";
        }
        date += month.toString() + "-";
        var day = this.attendanceDate.getDate();
        if(day < 10)
        {
            date += "0"
        }
        date += day.toString();
        return date;
    }

    saveChanges() : void
    {
        if(this.students 
            && this.studentsOriginal 
            && this.students.length == this.studentsOriginal.length)
        {
            for(let i = 0; i < this.students.length; i++)
            {
                var studentStatus = this.students[i].status;
                if(studentStatus == null)
                {
                    studentStatus = "Unknown";
                }
                if(this.studentsOriginal[i].status == null)
                {
                    //add new attendance record
                    this.studentService.PostAttendance(
                        {
                            attendanceID : 0,
                            studentID : this.students[i].studentID,
                            status : this.students[i].status,
                            date : this.jsonDate()
                        }
                    )
                }
                else if(this.students[i].status != this.studentsOriginal[i].status)
                {
                    //add new attendance record
                    this.studentService.PutAttendance(
                        {
                            attendanceID : this.students[i].attendanceID,
                            studentID : this.students[i].studentID,
                            status : this.students[i].status,
                            date : this.jsonDate()
                        }
                    )
                }
            }
        }
    }
}
