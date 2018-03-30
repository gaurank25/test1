import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
//import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

authState: any = null;



  constructor( private afAuth: AngularFireAuth,
               private router: Router ) {
                 this.afAuth.authState.subscribe((auth) => {
                   this.authState = auth;
                   console.log(this.authState);
                    console.log("inside member constartictor")
                  if(this.authState == null) {
              //  this.router.navigate(['../login']);
                }
      });
    }

  ngOnInit() {
  }

  signOut(): void {
   this.router.navigate(['../signout']);
 }

}
