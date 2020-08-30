import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicPageComponent } from './components/practice/topic-page/topic-page.component';
import { QuestionPageComponent } from './components/practice/question-page/question-page.component';
import { QuestionAuthoringPageComponent } from './components/practice/question-authoring-page/question-authoring-page.component';
import { LoginComponent } from './components/auth/login/login.component';



const routes: Routes = [
  { path: 'practice/create', component: QuestionAuthoringPageComponent },
  { path: 'practice/questions/:question', component: QuestionPageComponent },
  { path: 'practice/topics/:topic', component: TopicPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth', component: SignupComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
