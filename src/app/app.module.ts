import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { KatexModule } from 'ng-katex';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicPageComponent } from './components/practice/topic-page/topic-page.component';
import { MtdjHeaderComponent } from './components/mtdj-header/mtdj-header.component';
import { MtdgFooterComponent } from './components/mtdg-footer/mtdg-footer.component';
import { QuestionPageComponent } from './components/practice/question-page/question-page.component';
import { QuestionAuthoringPageComponent } from './components/practice/question-authoring-page/question-authoring-page.component';
import { LoginComponent } from './components/auth/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupComponent,
    PagenotfoundComponent,
    DashboardComponent,
    TopicPageComponent,
    MtdjHeaderComponent,
    MtdgFooterComponent,
    QuestionPageComponent,
    QuestionAuthoringPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

