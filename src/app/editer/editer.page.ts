import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceFirebaseService } from '../service-firebase.service';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.page.html',
  styleUrls: ['./editer.page.scss'],
})
export class EditerPage implements OnInit {
  chargement: boolean;
  estModifier: boolean;
  type: string;
  soustitre: string;
  titre: string;
  montant: string;
  id: any;
  transaction: any;
  constructor(private route: ActivatedRoute, private service: ServiceFirebaseService, private router: Router) { 
  }
  
  ngOnInit() {     
    this.route.params.subscribe((data: any) =>{
      this.id = data.type;
  
      if(data.type == "ajouter"){
        this.estModifier = false;
      }else{
        this.estModifier = true;
        this.service.recupererTransaction(data.type).subscribe((data) => {
          this.transaction = data;
          console.log( this.transaction.titre);
           this.type = this.transaction.type;
          this.soustitre = this.transaction.soustitre;
          this.titre = this.transaction.titre;
          this.montant = this.transaction.montant;
  
        })
      }
    })
   }

  ajouterTransaction(){
    this.chargement = true;
    if(this.estModifier){
      this.modifierTransaction();
      return;
    }
    let data = {
      type: this.type,
      soustitre: this.soustitre,
      titre: this.titre,
      montant: this.montant
    }
    this.service.ajouterTransaction(data).then((res:any) =>{
      // console.log(res);
      this.chargement = false;
      this.router.navigateByUrl('/crud')
    })
  }
  
  modifierTransaction(){
    let data = {
      type: this.type,
      soustitre: this.soustitre,
      titre: this.titre,
      montant: this.montant
    }

    this.service.modifierTransaction(this.id, data).then((donnee => {
      console.log(donnee);
      this.router.navigateByUrl('/crud');
    }))
  }
}
