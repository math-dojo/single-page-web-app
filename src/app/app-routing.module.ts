import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: 'auth/signup', component: LoginComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
