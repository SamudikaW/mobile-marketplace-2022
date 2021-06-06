// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from "@ionic/angular";

import '@firebase/auth';
import {firebase} from '@firebase/app';
import { Router } from "@angular/router";
import {AngularFirestore} from '@angular/fire/firestore';
import { GetuidComponent } from "../model/getuid/getuid.component";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public  userData:any;
  public static ev:boolean
  constructor(

    private ngFireAuth:AngularFireAuth,
    private router:Router,
    public afStore: AngularFirestore,
    private afs:AngularFirestore


  ) {
    this.ngFireAuth.authState.subscribe(user=>{
      if(user){
        this.userData=user;
        localStorage.setItem('user',JSON.stringify(this.userData));
      }
      else{
        localStorage.setItem('user', null);
      }
    })
   }
   ngOnInit() {



   }
   getUser(){
    return this.ngFireAuth.authState;
   }

  SignIn(email, password){
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email,password,fname, lname, pnum){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);



  }
  public async Signout(): Promise<any> {


    try {
      this.router.navigateByUrl('');

      return await this.ngFireAuth.signOut();

    } catch (e) {
      console.error("big hu?", e);
    }


  }
}
