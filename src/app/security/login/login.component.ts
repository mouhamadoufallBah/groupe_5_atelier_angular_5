import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  imageUrl = 'assets/logo.png';
  emailInput = "";
  passwordInput = "";
  nomCompletInput = "";
  currentForm = true;
  //variable qui nous permet de recuperer un objet a traver le mail saisie dans notre tableau users
  findUser: any;

  //variable qui nous permettra de recuperer notre local storage
  db: any;

  //Le variable qui nous permettra de stocker ce que l'utilisateur aura saisie pour s'inscrire
  addUser: any;
  
  //notre tableau d'utlisateur
  users = [
    {
      'id': 1,
      'nomComplet': 'admin',
      'email': 'admin@gmail.com',
      'motDepasse': 'passer',
      'contact': [
        {
          'id': 1,
          'nom': 'sow',
          'prenom': 'idy',
          'email': 'idy@sow.com',
          'telephone': 771023456,
          'photo': 'exmple.com',
          'etat': false,
          'createdAT': '01/01/2023',
          'createdBy': 'admin',
          'updatedAt': '',
          'updatedBy': '',
          'description': "La description d'une personne implique de discuter de son apparence physique et de sa personnalité. Cet exposé se concentre sur les adjectifs associés à l'apparence physique et à la personnalité, tout en abordant également la formation au féminin."
        }
      ]
    }
  ]

  constructor(private route: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users))
    }

    if(localStorage.getItem('currentUser')){
      this.route.navigate(['/', 'contact-list']);
    }

  }
//<!-- Ndiaga -->
  login() {
    //Si les champs sont vide on affiche une message d'erreur❌
    // Sinon on essaye de trouver le user correspondant✅
    if (this.emailInput == "" || this.passwordInput == "") {
      this.showMessage('error', 'Email ou mot de passe incorecte');
    } else {
      //recuperer notre local storage
      this.db = JSON.parse(localStorage.getItem('users') || '[]');

      //On essaye de recuperer le user qui a le mail siasie
      this.findUser = this.db.find((element:any) => element.email == this.emailInput);
      //on verifie si notre variable à trouver un objet correspondant
      if (this.findUser) {
        //On verifie si le mot de passe est bon
        if (this.findUser.motDepasse == this.passwordInput) {
          this.showMessage('success', 'Connexion avec succées');
          this.route.navigate(['/', 'contact-list']);

          //enregistrer l'utilisateur connecter
          localStorage.setItem('currentUser', JSON.stringify(this.findUser.id));

          //vider les champs
          this.emailInput = "";
          this.passwordInput = "";
        } else {
          this.showMessage('error', 'Email ou mot de passe incorecte');
        }
      } else {
        this.showMessage('error', 'Email ou mot de passe incorecte');
      }
    }
  }

  register() {
    if (this.emailInput == "" || this.passwordInput == "" || this.nomCompletInput == "") {
      this.showMessage('error', 'Veuillez remplir tout les champs')
    } else if (this.emailInput == "" || this.passwordInput.length < 8 || this.nomCompletInput == "") {
      this.showMessage('error', 'veuillez entrer un mot de passe de plus de 9 caractère')
    } else {
      //recuperer notre local storage
      this.db = JSON.parse(localStorage.getItem('users') || '[]');

      //inscription de l'utilisateur
      this.addUser = {
        'id': +this.db.length + 1,
        'nomComplet': this.nomCompletInput,
        'email': this.emailInput,
        'motDepasse': this.passwordInput,
        'contact': []
      }

      // ajouter notre utilisateur dans un tableaux temporarire qui est le copie de notre local Storage
      this.db.push(this.addUser);

      //ajouter l'utilisateur dans le localstorage
      localStorage.setItem('users', JSON.stringify(this.db));

      //afficher message
      this.showMessage('success', 'Connexion avec succées');
      //redirection vers page de connexion
      this.switchForm();

      this.emailInput = "";
      this.passwordInput = "";
      this.nomCompletInput = "";
    }

  }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }

  switchForm() {
    this.currentForm = !this.currentForm;
  }

  goBackHome() {
    this.switchForm();
  }
}
