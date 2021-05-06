import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PracticeComponent } from './components/practice/practice.component';
import { TopicPageComponent } from './components/practice/topic-page/topic-page.component';
import { QuestionPageComponent } from './components/practice/question-page/question-page.component';
import { QuestionAuthoringPageComponent } from './components/practice/question-authoring-page/question-authoring-page.component';
import { QuestionAuthoringGuard } from './components/practice/question-authoring-page/question-authoring.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { PracticeHomeComponent } from './components/practice/practice-home/practice-home.component';

const routes: Routes = [
  {
    path: 'practice',
    component: PracticeComponent,
    children: [
      { path: 'questions/:question', component: QuestionPageComponent },
      { path: 'topics/:topic', component: TopicPageComponent },
      {
        path: 'create',
        component: QuestionAuthoringPageComponent
      },
      { path: '', component: PracticeHomeComponent },
    ],
  },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth', component: SignupComponent },
  { path: 'home', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
