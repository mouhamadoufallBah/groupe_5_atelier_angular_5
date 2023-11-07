import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {


  nomInput = '';
  prenomInput = '';
  emailInput = '';
  telephoneInput = '';
  photoInput = '';
  descriptionInput = '';

  contactId = 0;
  currentUserId = JSON.parse(localStorage.getItem('currentUser') || '[]');
  currentUserObj: any;
  contactInfo: any;


  //recuperer notre local storage
  db = JSON.parse(localStorage.getItem('users') || '[]');

  //recuperer les info de l'utilisateur connecter
  currrentUser = this.db.find((element: any) => element.id == this.currentUserId)

  //Variable pour stocker le tableau contact du current user
  contact = this.currrentUser.contact;

  //contact à modifier
  contactToUpdate: any;



  constructor(private route: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.contactId = +this.route.snapshot.params['id'];

    this.currentUserObj = this.db.find((user: any) => user.id == this.currentUserId)
    this.contactInfo = (this.currentUserObj.contact).find((element: any) => element.id == this.contactId);

    this.nomInput = this.contactInfo.nom;
    this.prenomInput = this.contactInfo.prenom;
    this.emailInput = this.contactInfo.email;
    this.telephoneInput = this.contactInfo.telephone;
    this.photoInput = this.contactInfo.photo;
    this.descriptionInput = this.contactInfo.description;
  }


  updateContact() {
    if (this.nomInput.length < 2 || this.prenomInput == "" || this.emailInput == "" || this.telephoneInput == "" || this.photoInput == "" || this.descriptionInput == "") {
      this.showMessage('error', 'Veuillez remplir tout les champs');
    } else {
      //modifier l'objet a ajouter dans le tableau contact
      this.contactInfo = {
        'id': this.contactInfo.id,
        'nom': this.nomInput,
        'prenom': this.prenomInput,
        'email': this.emailInput,
        'telephone': this.telephoneInput,
        'photo': this.photoInput,
        'etat': this.contactInfo.etat,
        'createdAT': this.contactInfo.createdAT,
        'createdBy': this.currrentUser.nomComplet,
        'updatedAt': new Date().toLocaleDateString(),
        'updatedBy': this.currrentUser.nomComplet,
        'description': this.descriptionInput
      }

      // Trouver l'index de l'élément à mettre à jour dans le tableau
      const indexToUpdate = this.currentUserObj.contact.findIndex((element: any) => element.id === this.contactInfo.id);

      // Vérifier si l'élément a été trouvé (l'ID existe dans le tableau)
      if (indexToUpdate !== -1) {
        // Mettre à jour l'élément avec les nouvelles données de contactInfo
        this.currentUserObj.contact[indexToUpdate] = this.contactInfo;
      }

      //remplacer le tableau contact du current user dans le local storage a celui de tableau contact où on a ajouter le nouveau contact
      this.currrentUser.contact = this.contact;

      //etablir le changement dans notre local storage
      localStorage.setItem('users', JSON.stringify(this.db))


      this.showMessage('success', 'Ajout avec succées');

      //rediriger vers la liste des contact
      this.router.navigate(['/', 'contact-list']);

    }
  }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }

}
