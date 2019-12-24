import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: 'auth/signup', component: AuthComponent },
  { path: 'auth/login', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
