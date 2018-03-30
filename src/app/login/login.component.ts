import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authState: any = null;
  error : any;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
            private router: Router) {

            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth;
              console.log(this.authState);
              console.log("inside  login constartictor")
              console.log("inside login init")
             if(this.authState!= null) {

           this.router.navigate(['/members']);
           }

            });
          }

ngOnInit() {

}


googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()
  return this.socialSignIn(provider);
}


get authenticated(): boolean {
  console.log("inside authenticated");
  console.log(this.authState);
  return this.authState !== null;

}

get currentUserId(): string {
   return this.authenticated ? this.authState.uid : '';
 }

  login(data) {
    console.log(data.email);
    console.log(data.password);
     return this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
       .then((user) => {
         this.authState = user
         if(this.authState!=null){
       this.router.navigate(['/members']);
      }
   })
       .catch(error => console.log(error));
  }

  facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.socialSignIn(provider);

    }

    twitterLogin(){
   const provider = new firebase.auth.TwitterAuthProvider()
   return this.socialSignIn(provider);
 }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user
          this.updateUserData()
          //this.router.navigate(['/members']);
      })
      .catch(error => console.log(error));
  }

  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                  email: this.authState.email,
                  name: this.authState.displayName
                }

    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }

  emailSignUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }



}
