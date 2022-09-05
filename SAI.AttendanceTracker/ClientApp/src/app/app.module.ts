import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layouts/main.layout/main.layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material.module';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StudentNotesComponent } from './pages/student-notes/student-notes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';

//export const MY_FORMATS: MatDateFormats = {
//  parse: {
//    dateInput: 'DD.MM.YYYY',
//  },
//  display: {
//    dateInput: 'DD.MM.YYYY',
//    monthYearLabel: 'MM YYYY',
//    dateA11yLabel: 'DD.MM.YYYY',
//    monthYearA11yLabel: 'MM YYYY',
//  },
//};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    TableComponent,
    StudentNotesComponent,
    NotFoundComponent,
    AlertDialogComponent,
    StudentFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
