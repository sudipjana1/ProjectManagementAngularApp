import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AddTaskComponent } from './add-task/add-task.component';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { DatepickerPopupComponent } from './datepicker-popup/datepicker-popup.component';
import { DatePipe } from '@angular/common';
import { ViewTaskComponent } from './view-task/view-task.component';



@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AddUserComponent,
    AddProjectComponent,
    DatepickerPopupComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSelectModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
