import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  dateCourante: string;
  tache: string;
  ajoutTache: boolean;
  taches = [];
  constructor(private bd: AngularFireDatabase) {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    this.dateCourante = date.toLocaleDateString('fr-FR',options);
    this.getTaches();
  }

  ajoutertache(){
    this.bd.list('Tasks/').push({
      nom: this.tache,
      date: new Date().toISOString(),
      terminer: false
    });
    this.afficherFormulaire();
  }

  afficherFormulaire(){
    this.ajoutTache = !this.ajoutTache;
    this.tache = '';
  }

  getTaches(){
    this.bd.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.taches = [];
      actions.forEach(action => {
        this.taches.push({
          key: action.key,
          nom: action.payload.exportVal().nom,
          date: action.payload.exportVal().date.substring(11, 16),
          terminer: action.payload.exportVal().terminer
        });
      });
    });
  }

  changeEtat(etat: any){+   
    console.log("Etat:" + etat.nom +" = "  + etat.terminer)
    this.bd.object('Tasks/' + etat.key + '/terminer/').set(etat.terminer);    // Modifier par son identifiant
  }

  supprimertache(tache: any){
    this.bd.list('Tasks/').remove(tache.key);       // On le supprime en lui passant l'identifiant 
  }
}
