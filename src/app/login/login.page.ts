import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  message: string;
  connect: boolean;
  user = {
    email: '',
    password: ''
  }
  constructor( private afAuth: AngularFireAuth, private route:Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth){
        console.log("Non connecté");
        this.connect = false;
      }else{
        console.log('Connecté');
        this.route.navigate(['/'])
        this.connect = true;
        console.log(auth.uid)
        console.log(auth.providerData[0].email)
      };
    });
  }

  createUser(){
    this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
    this.user = {
      email: '',
      password: ''
    };
  }

  login(){
    this.message = '';
    if(this.user.email=='' && this.user.password==''){
      this.message = "Veillez remplir tous les champs !"
      return;
    }
    if(this.user.email=='' || this.user.email.length <= 2){
      this.message = "Email vide ou trop court!";
      return;
    }
    if(this.user.password=='' || this.user.password.length <= 2){
      this.message = "Mot de passe vide ou trop court !";
      return;
    }
    this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
  };

  deconnecter(){
    this.afAuth.signOut();
  }
};