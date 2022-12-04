import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  messager : string='';
  messages : string= '';
  age: number= 0;
  n: string = '';
  noms : Observable<any[]>
  formulaire = {
    nom: '',
    prenom: '',
    age: ''
  }
  constructor(private firestore : AngularFirestore) {
    this.noms = this.firestore.collection('Etudiants').valueChanges();
    // this.firestore.collection('Etudiants').snapshotChanges(['added','removed','modified']).subscribe(noms => {
    //   noms.forEach(nom => {
    //     // console.log("Nom du Personne: " + nom.payload.doc.data()['age']);
    //     this.noms.push({
    //       nom: nom.payload.doc.data()['nom'],
    //       prenom: nom.payload.doc.data()['prenom'],
    //       age: nom.payload.doc.data()['age']
    //     });
    //   });
    // });
  }
  
  ajouter(){
    if(this.formulaire.nom!="" && this.formulaire.prenom!="" && this.formulaire.age!=""){
      this.firestore.collection('Etudiants').add(this.formulaire);
      this.formulaire = {
        nom: '',
        prenom: '',
        age: ''
      };
      this.messager='';
      this.messages = "Créer avec succés";
    }
    else{
      this.messages = '';
      this.messager = "veillez remplir tous les champs";
    }
  };

}
