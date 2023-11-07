import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent implements OnInit {
  //recuperer l'id de l'utilisateur connecter
  idCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');

  //variarble qui nous permetra d'avoir les info de l'utilisateur conneceter
  currrentuser: any

  //variable qui nous permettra d'avoir le tableau des contact de l'utilsateur connecter
  contacts: any;

  //recuperer le contact a archoiver
  contactToArchive: any;

   //valeur du filter
   filterValue = '';

   //les element trouver
   filteredElement:any;

  //notre localStorage
  db = JSON.parse(localStorage.getItem('users') || '[]')


  constructor(private route: Router){}

  ngOnInit(): void {
    //recuperer les info de l'utilisateur connecter
    this.currrentuser = this.db.find((element: any) => element.id == this.idCurrentUser);

    //recuperer les contact de l'utlisateur connecter dont leur etat est egal a false
    this.contacts = (this.currrentuser.contact).filter((contact: any) => contact.etat == false);

    this.filteredElement = this.contacts;
  };

  archiver(id: number) {
    //recuperer le contact a archiver
    this.contactToArchive = this.contacts.find((element: any) => element.id == id);

    Swal.fire({
      title: "Etes-vous sûr de voiloir supprimer ce contact?",
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veus supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Contact supprimer',
          'Le fichier est envoyer dans votre corbeille',
          'success'
        );

        //changer l'etat à true
        this.contactToArchive.etat = true;

        //mis a jours du local storage
        localStorage.setItem('users', JSON.stringify(this.db))

        //recuperer les contact de l'utlisateur connecter dont leur etat est egal a false
        this.contacts = (this.currrentuser.contact).filter((contact: any) => contact.etat === false);

      }
    })


  }

  logout(){
    //supprimer le currentuser dans notre local staorage
    localStorage.removeItem('currentUser')
    //redirection vers login
    this.route.navigate(['/', 'login']);
  }


  filterByTitle(){
    if (!this.filterValue) {
      this.filteredElement = this.contacts;
    }

    this.filteredElement = this.contacts.filter(
      (elt:any) => elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
}
