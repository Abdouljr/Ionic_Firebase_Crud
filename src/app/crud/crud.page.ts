import { Component, OnInit } from '@angular/core';
import { ServiceFirebaseService } from '../service-firebase.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  transactions : any;
  constructor(private service: ServiceFirebaseService) { }

  ngOnInit() {
    this.service.recuperer_tous_transactions().subscribe((data) => {
      this.transactions = data.map(e => {
        return{
          id: e.payload.doc.id,
          type: e.payload.doc.data()['type'],
          titre: e.payload.doc.data()['titre'],
          soustitre: e.payload.doc.data()['soustitre'],
          montant: e.payload.doc.data()['montant']
        }
      })
      console.log(this.transactions)
    },(err: any)=>{
      console.log(err);
    }
    )
  }

  supprimer(id: string){
    this.service.supprimerTransaction(id).then((reponse =>{
      console.log(reponse);
    }))
  }

}
