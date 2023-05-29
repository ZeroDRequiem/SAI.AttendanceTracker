import { Component } from "@angular/core";

@Component({
  selector: 'sai-root',
  template: `
  <div><h1>{{pageTitle}}</h1>
    <sai-students></sai-students>
  </div>
  `
})
export class AppComponent{
  pageTitle = "SAI Attendance Tracker"
}