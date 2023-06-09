import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './students/student-list.component';
import { RouterModule } from '@angular/router';
import { StudentService } from './students/student.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    StudentListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
