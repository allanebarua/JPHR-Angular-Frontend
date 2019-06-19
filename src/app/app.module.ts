import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersistenceModule} from 'angular-persistence';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { PatientComponent } from './components/patient/patient.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { HealthRecordsComponent } from './components/health-records/health-records.component';
import { Error404Component } from './components/error404/error404.component';
import { CreateHealthRecordComponent } from './components/create-health-record/create-health-record.component';
import { ViewHealthRecordComponent } from './components/view-health-record/view-health-record.component';
import { UpdateHealthRecordComponent } from './components/update-health-record/update-health-record.component';
import { SummaryMedicalRecordComponent } from './components/summary-medical-record/summary-medical-record.component';
import { SummaryRecordDetailedViewComponent } from './components/summary-record-detailed-view/summary-record-detailed-view.component';
import { SummaryRecordListViewComponent } from './components/summary-record-list-view/summary-record-list-view.component';
import { UpdateSummaryRecordComponent } from './components/update-summary-record/update-summary-record.component';
import { RequestAuthorizationComponent } from './components/request-authorization/request-authorization.component';
import { UpdateAuthorizationComponent } from './components/update-authorization/update-authorization.component';
import { CareProviderComponent } from './components/care-provider/care-provider.component';
import { CareProviderAuthorizationComponent } from './components/care-provider-authorization/care-provider-authorization.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { RequestMoreAccessRightsComponent } from './components/request-more-access-rights/request-more-access-rights.component';
import { AuthorizationRequestViewComponent } from './components/authorization-request-view/authorization-request-view.component';
import { PatientReportsComponent } from './components/patient-reports/patient-reports.component';
import { MyProvidersComponent } from './components/my-providers/my-providers.component';
import { MyPatientsComponent } from './components/my-patients/my-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    PatientComponent,
    AuthorizationComponent,
    HealthRecordsComponent,
    Error404Component,
    CreateHealthRecordComponent,
    ViewHealthRecordComponent,
    UpdateHealthRecordComponent,
    SummaryMedicalRecordComponent,
    SummaryRecordDetailedViewComponent,
    SummaryRecordListViewComponent,
    UpdateSummaryRecordComponent,
    RequestAuthorizationComponent,
    UpdateAuthorizationComponent,
    CareProviderComponent,
    CareProviderAuthorizationComponent,
    HomePageComponent,
    LoadingPageComponent,
    RequestMoreAccessRightsComponent,
    AuthorizationRequestViewComponent,
    PatientReportsComponent,
    MyProvidersComponent,
    MyPatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersistenceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
