import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attendance } from "../attendance/attendance";
import { StudentAttendance } from "./studentAttendance";

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private baseUrl = 'http://localhost:5143/api/StudentAttendances/';
    private studentsUrl: string;
    private userId = 1;
    private date = new Date("05/28/2023");

    students$: Observable<StudentAttendance[]>
    
    SetDate(date: Date) : void
    {
        this.date = date;
        this.studentsUrl = this.baseUrl + this.userId + "/" + this.searchDate(date);
    }

    SetUserId(userId : number)
    {
        this.userId = userId;
        this.studentsUrl = this.baseUrl + userId.toString() + "/" + this.searchDate(this.date);
    }

    UpdateStudents() : void
    {
        this.students$ = this.http.get<StudentAttendance[]>(this.studentsUrl);
    }

    private searchDate(date: Date) : string
    {
        var returnDate = date.getFullYear().toString();
        var month = date.getMonth() + 1;
        if(month < 10)
        {
            returnDate += "0";
        }
        returnDate += month.toString();
        var day = date.getDate();
        if(day < 10)
        {
            returnDate += "0";
        }
        returnDate += day.toString();
        return returnDate;
    }

    constructor(private http: HttpClient){
        this.studentsUrl = this.baseUrl + this.userId + "/" + this.searchDate(this.date);
        this.students$ = this.http.get<StudentAttendance[]>(this.studentsUrl);
    }

    PostAttendance(attendance : Attendance)
    {
        this.http.post<any>(
            "http://localhost:5143/api/Attendances",
            attendance
        ).subscribe();
    }

    PutAttendance(attendance : Attendance)
    {
        this.http.put<any>(
            "http://localhost:5143/api/Attendances/"
            + attendance.attendanceID.toString(),
            attendance
        ).subscribe(result => console.log("success"), error => console.log("error", error));
    }

}