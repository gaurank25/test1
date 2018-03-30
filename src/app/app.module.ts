import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
    SignupComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
      path : "login",
      component : LoginComponent
    },
    {
      path : "members",
      component : MembersComponent
    },
    {
      path : "signout",
      component : SignoutComponent
    },
    {
      path : "signup",
      component : SignupComponent
    }
]),
    RecaptchaModule.forRoot(),
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
