import { HomePageComponent } from './components/home-page/home-page.component';
import { CareProviderComponent } from './components/care-provider/care-provider.component';
import { PatientComponent } from './components/patient/patient.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'provider', component: CareProviderComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
