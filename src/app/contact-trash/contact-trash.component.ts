import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-trash',
  templateUrl: './contact-trash.component.html',
  styleUrls: ['./contact-trash.component.css']
})
export class ContactTrashComponent implements OnInit {

  constructor(private route: Router) { }

  //recuperer l'id de l'utilisateur connecter
  idCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  //variarble qui nous permetra d'avoir les info de l'utilisateur conneceter
  currrentuser: any

  //variable qui nous permettra d'avoir le tableau des contact de l'utilsateur connecter
  contacts: any;

  //recuperer le contact a archoiver
  contactToArchive: any;

  //notre localStorage
  db = JSON.parse(localStorage.getItem('users') || '[]')

  ngOnInit(): void {
    //recuperer les info de l'utilisateur connecter
    this.currrentuser = this.db.find((element: any) => element.id == this.idCurrentUser)

    //recuperer les contact de l'utlisateur connecter dont leur etat est egal a false
    this.contacts = (this.currrentuser.contact).filter((contact: any) => contact.etat === true);
  };

  archiver(id: number) {
    //recuperer le contact a archiver
    this.contactToArchive = this.contacts.find((element: any) => element.id == id);
    Swal.fire({
      title: "Etes-vous sûr de voiloir restaurer ce contact?",
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veus restaurer'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Contact restauré',
          'Contact restauré avec succées',
          'success'
        );

        //changer l'etat à true
        this.contactToArchive.etat = false;

        //mis ajour de notre local storage
        localStorage.setItem('users', JSON.stringify(this.db))

        //recuperer les contact de l'utlisateur connecter dont leur etat est egal a false
        this.contacts = (this.currrentuser.contact).filter((contact: any) => contact.etat === false);

        //redirection vers la lise des contact
        this.route.navigate(['/', 'contact-list'])


      }
    })


  }

}
