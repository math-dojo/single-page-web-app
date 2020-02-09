import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicPageComponent } from './components/practice/topic-page/topic-page.component';
import { MtdjHeaderComponent } from './components/mtdj-header/mtdj-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupComponent,
    PagenotfoundComponent,
    DashboardComponent,
    TopicPageComponent,
    MtdjHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
