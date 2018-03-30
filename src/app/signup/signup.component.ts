import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { RecaptchaModule } from 'ng-recaptcha';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

requestobj: object= {};
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
            private router: Router,
          private http:Http) {

             }
             resolved(captchaResponse: string) {
        console.log(captchaResponse);
this.check(captchaResponse);
    }

authState: any = null;

             emailSignUp(data) {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        this.authState = user;
        console.log(data.displayName);

        this.updateUserData(data.displayName);
      })
      .catch(error => console.log(error));
  }
private headers = new Headers();


check(captchaResponse)
{
  this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
  this.headers.append('Access-Control-Allow-Methods', 'GET');
  this.headers.append('Access-Control-Allow-Origin', '*');
  this.requestobj={
    "secret" : "6LdSy04UAAAAADWJcH5Iu1IBwQ6UfRL6GX9_5TQi",
    "response" : captchaResponse,
    "remoteip" : "localhost"
  }
  console.log(this.requestobj);
  console.log(this.headers);
  const url= `${"https://www.google.com/recaptcha/api/siteverify?secret=6LdSy04UAAAAADWJcH5Iu1IBwQ6UfRL6GX9_5TQi&response="}${captchaResponse}`
  console.log(url);
  this.http.post(url,this.headers).subscribe(
    (val)=>{
    console.log("post call sucessfull");
  },
  response => {
           console.log("POST call in error", response);
       },
       () => {
           console.log("The POST observable is now completed.");
       }
  );
}

  private updateUserData(displayName): void {
 // Writes user name and email to realtime db
 // useful if your app displays information about users or for admin features
   let path = `users/${this.currentUserId}`; // Endpoint on firebase
   let data = {
                 email: this.authState.email,
                 name: displayName

               }

   this.db.object(path).update(data)
   .catch(error => console.log(error));

 }

 get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get authenticated(): boolean {
    console.log("inside authenticated");
    console.log(this.authState);
    return this.authState !== null;

  }


  ngOnInit() {
  }

}
