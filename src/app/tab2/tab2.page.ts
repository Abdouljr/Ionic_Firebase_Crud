import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  images = [];
  constructor( private afDB : AngularFireDatabase, private afSG: AngularFireStorage) {
    this.getImagesDatabase();
  }
  
  getImagesDatabase() {
    // pour récupérer les informations des images
    this.afDB.list('Images/').snapshotChanges(['child_added']).subscribe(images =>{
      // console.table(images)
      images.forEach(image =>{
    console.log("like: " + image.key)
    this.getImagesStorage(image);
      })
    })
  }
  
  getImagesStorage(image: any) {
    // pour récupérer l'URL des images
    const img = image.payload.exportVal().ref;
    this.afSG.ref(img).getDownloadURL().subscribe(imgUrl => {
      this.images.push({
        key: image.key,
        nom: image.payload.exportVal().name,
        description: image.payload.exportVal().description,
        like: image.payload.exportVal().like,
        url: imgUrl
      });
    });
  }

  liked(img: any){
    img.like++;
    this.afDB.object('Images/' + img.key).update({
      like: img.like
    });
  }

}
  