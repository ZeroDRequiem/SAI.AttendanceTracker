import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Student } from "./student";

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private studentsUrl = 'http://localhost:5143/api/StudentAttendances/1/20230528';

    students$ = this.http.get<Student[]>(this.studentsUrl);
    
    constructor(private http: HttpClient){}

}