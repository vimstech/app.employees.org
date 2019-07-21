import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    MessageComponent,
    DashboardComponent,
    EmployeeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
