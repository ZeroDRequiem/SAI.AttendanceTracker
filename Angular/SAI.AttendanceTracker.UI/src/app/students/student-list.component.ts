import { Component } from "@angular/core";

@Component({
    selector: "sai-students",
    templateUrl: "./student-list.component.html",
})

export class StudentListComponent{
    pageTitle = "Student List"
    students: any[] = [
        {
            "StudentID": 1,
            "FirstName": "Abdurrahman",
            "LastName": "Alatas",
            "MiddleName": "\"Abe\"",
            "PinnedNote": null,
            "Status": "Attended"
        },
        {
            "StudentID": 2,
            "FirstName": "Alpacasso",
            "LastName": "Kennedy",
            "MiddleName": null,
            "PinnedNote": null,
            "Status": "Absent"
        },
        {
            "StudentID": 3,
            "FirstName": "Hakuno",
            "LastName": "Kishinami",
            "MiddleName": "Zabiko",
            "PinnedNote": null,
            "Status": "Excused"
        },
        {
            "StudentID": 4,
            "FirstName": "Lelouch",
            "LastName": "Lamperouge",
            "MiddleName": null,
            "PinnedNote": null,
            "Status": null
        }
    ]
    changeStatus(studentID: number): void {
        var index = this.students.findIndex(x => x.StudentID == studentID);
        if(index >= 0)
        {
            switch(this.students[index].Status)
            {
                case null:
                case "Unknown":
                    this.students[index].Status = "Attended";
                    break;
                case "Attended":
                    this.students[index].Status = "Absent";
                    break;
                case "Absent":
                    this.students[index].Status = "Excused";
                    break;
                case "Excused":
                    this.students[index].Status = "Unknown";
                    break;
            }
        }
    }
}
