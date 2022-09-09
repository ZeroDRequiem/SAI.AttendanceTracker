import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { MainLayoutComponent } from './layouts/main.layout/main.layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StudentCalendarComponent } from './pages/student-calendar/student-calendar.component';
import { StudentNotesComponent } from './pages/student-notes/student-notes.component';

const routes: Routes = [

  {
    path: '',
    //pathMatch: 'full',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'students/:id/notes', component: StudentNotesComponent },
      { path: 'students/:id/calendar', component: StudentCalendarComponent },
      { path: 'testing', component: TableComponent },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
