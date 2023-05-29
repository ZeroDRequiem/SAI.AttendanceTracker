import { Component } from "@angular/core";

@Component({
    selector: 'sai-students',
    templateUrl: './student-list.component.html'
})

export class StudentListComponent{
    pageTitle = 'Student List'
    students: any[] = [
        {
            "StudentID": 1,
            "FirstName": "Abdurrahman",
            "LastName": "Alatas",
            "MiddleName": "\"Abe\"",
            "PinnedNote": null,
            "UserID": 1
        },
        {
            "StudentID": 2,
            "FirstName": "Alpacasso",
            "LastName": "Kennedy",
            "MiddleName": null,
            "PinnedNote": null,
            "UserID": 1
        },
        {
            "StudentID": 3,
            "FirstName": "Hakuno",
            "LastName": "Kishinami",
            "MiddleName": "Zabiko",
            "PinnedNote": null,
            "UserID": 1
        }
    ]
}