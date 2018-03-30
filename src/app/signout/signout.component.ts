import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
authState: any = null;
  constructor( private afAuth: AngularFireAuth,
               private router: Router ) {
                 this.afAuth.authState.subscribe((auth) => {
                   this.authState = auth;
                //   console.log("inside sign out constructor");
                   this.logOut();
      });
    }

  ngOnInit() {
  //  console.log("inside member constartictor")
  }

  logOut() {
   this.afAuth.auth.signOut();
  // console.log("inside signout method in signout component")
   if(this.authState == null) {
     this.router.navigate(['../signout']);
 }
 }

}
