import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent {

  nomInput = '';
  prenomInput = '';
  emailInput = '';
  telephoneInput = '';
  photoInput = '';
  descriptionInput = '';

  //creation de l'objet
  objContact: any

  constructor(private route: Router){}



  //recuper l'utilisateur connecter
  idCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  //recuperer notre local storage
  db = JSON.parse(localStorage.getItem('users') || '[]');

  //recuperer les info de l'utilisateur connecter
  currrentUser = this.db.find((element: any) => element.id == this.idCurrentUser)

  //Variable pour stocker le tableau contact du current user
  contact = this.currrentUser.contact;


  addContact() {
    if (this.nomInput.length < 2 || this.prenomInput == "" || this.emailInput == "" || this.telephoneInput == "" || this.photoInput == "" || this.descriptionInput == "") {
      this.showMessage('error', 'Veuillez remplir tout les champs');
    } else {
      //creer l'objet a ajouter dans le tableau contact
      this.objContact = {
        'id': this.contact.length + 1,
        'nom': this.nomInput,
        'prenom': this.prenomInput,
        'email': this.emailInput,
        'telephone': this.telephoneInput,
        'photo': this.photoInput,
        'etat': false,
        'createdAT': new Date().toLocaleDateString(),
        'createdBy': `${this.currrentUser.prenom} ${this.currrentUser.nom}`,
        'updatedAt': '',
        'updatedBy': '',
        'description': this.descriptionInput
      }

      //ajouter l'objet dans le tableau
      this.contact.push(this.objContact);

      //remplacer le tableau contact du current user dans le local storage a celui de tableau contact où on a ajouter le nouveau contact
      this.currrentUser.contact = this.contact;

      //etablir le changement dans notre local storage
      localStorage.setItem('users', JSON.stringify(this.db))


      this.showMessage('success', 'Ajout avec succées');

      //rediriger vers la liste des contact
      this.route.navigate(['/', 'contact-list']);
    }
  }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }

  // createObjectContact(){
  //   this.objContact = {
  //       'id': this.contact.length+1,
  //       'nom': this.nomInput,
  //       'prenom': this.prenomInput,
  //       'email': this.emailInput,
  //       'telephone': this.telephoneInput,
  //       'photo': this.photoInput,
  //       'etat': false,
  //       'createdAT': new Date().toLocaleDateString(),
  //       'createdBy': `${this.currentUser.prenom} ${this.currentUser.nom}`,
  //       'updatedAt': '',
  //       'updatedBy': '',
  //       'description': this.descriptionInput
  //     }
  // }


}




