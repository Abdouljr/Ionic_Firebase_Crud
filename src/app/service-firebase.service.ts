import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService {
  table = "transaction"
  constructor(private firebase: AngularFirestore) { }

  recuperer_tous_transactions() {
    return this.firebase.collection(this.table).snapshotChanges();
  };

  ajouterTransaction(data: any){
    return this.firebase.collection(this.table).add(data);
  }

  supprimerTransaction(id: string){
    return this.firebase.doc(this.table + "/" + id).delete();
  }

  recupererTransaction( id : string){
    return this.firebase.collection(this.table).doc(id).valueChanges();
  }

  modifierTransaction(id: string, data: object){
    return this.firebase.doc(this.table + "/" + id).update(data);
  }
}
