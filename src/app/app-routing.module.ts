import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'auth/signup', component: LoginComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
