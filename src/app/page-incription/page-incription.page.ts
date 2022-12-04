import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-page-incription',
  templateUrl: './page-incription.page.html',
  styleUrls: ['./page-incription.page.scss'],
})
export class PageIncriptionPage implements OnInit {
  emails= [];

  // Messages d'erreurs
  message: string;
  msgn: string;
  msgp: string;
  msgps: string;
  msgm: string;
  msga: string;
  msgmdp: string;

  utilisateurs = {
    nom: '',
    prenom: '',
    pseudo: '',
    age: '',
    email: '',
    mdp: '',
    mdpconf: ''
  }
  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase) { }

  ngOnInit() {
    this.afDB.list('utilisateurs/').snapshotChanges(["child_added", ]).subscribe(users => {
      users.forEach(user => {
        this.emails.push(user.payload.exportVal().email)
      })
    })
  }

  confirmer(){
    if(this.utilisateurs.nom =='' || this.utilisateurs.prenom =='' || this.utilisateurs.age =='' || this.utilisateurs.email =='' || this.utilisateurs.pseudo =='' || this.utilisateurs.mdp =='' || this.utilisateurs.mdpconf==''){
      this.message = "Tous les champs sont obligatoires !";
      return;
    }
    if(this.utilisateurs.nom =='' && this.utilisateurs.prenom =='' && this.utilisateurs.age =='' && this.utilisateurs.email =='' && this.utilisateurs.pseudo =='' && this.utilisateurs.mdp =='' && this.utilisateurs.mdpconf==''){
      this.message = "Veillez remplir tous les champs !";
      return;
    }
    if(this.utilisateurs.nom !='' && this.utilisateurs.prenom !='' && this.utilisateurs.age !='' && this.utilisateurs.email !='' && this.utilisateurs.pseudo !='' && this.utilisateurs.mdp !='' && this.utilisateurs.mdpconf!=''){
    if(this.utilisateurs.nom.length <= 2){
      this.msgn = "nom vide ou trop court"
    }
    if(this.utilisateurs.nom.length > 25){
      this.msgn = "nom trop long"
    }
    if(this.utilisateurs.prenom.length <= 2){
      this.msgp = "prénom vide ou trop court"
    }
    if(this.utilisateurs.prenom.length > 50){
      this.msgp = "nom trop long"
    }
    if(this.utilisateurs.pseudo.length <= 2){
      this.msgps = "pseudo vide ou trop court"
    }
    if(this.utilisateurs.prenom.length > 10){
      this.msgps = "pseudo trop long"
    }
    if(this.utilisateurs.email.length <= 10){
      this.msgm = "email vide ou trop court"
    }
    if(this.utilisateurs.email.length > 30){
      this.msgm = "email trop long"
    }
    if(this.emails.includes(this.utilisateurs.email)){
      this.msgm = "cet email est déjà lier à un compte"
    }

    const age = parseInt(this.utilisateurs.age); 
    console.log("après 10 ans: " + (age+10))
    if(age <= 10 || age > 100){
      this.msga = "âge invalide"
    }

    if(this.utilisateurs.mdp !== this.utilisateurs.mdpconf){
      this.msgmdp = "les mot de passe ne sont pas le même !"
    }
    return;
   }
   this.afAuth.createUserWithEmailAndPassword(this.utilisateurs.email, this.utilisateurs.mdp);
   this.afDB.list('utilisateurs/').push(this.utilisateurs);
   this.utilisateurs = {
    nom: '',
    prenom: '',
    pseudo: '',
    age: '',
    email: '',
    mdp: '',
    mdpconf: ''
  }
  }
 }

