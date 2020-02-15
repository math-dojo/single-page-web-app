import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicPageComponent } from './components/practice/topic-page/topic-page.component';
import { QuestionPageComponent } from './components/practice/question-page/question-page.component';


const routes: Routes = [
  { path: 'questions/:question', component: QuestionPageComponent },
  { path: 'topics/:topicname', component: TopicPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/login', component: SignupComponent },
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
