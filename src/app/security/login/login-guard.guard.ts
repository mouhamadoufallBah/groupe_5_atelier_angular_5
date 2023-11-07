import { CanActivateFn } from '@angular/router';

export const loginGuardGuard: CanActivateFn = () => {

   // Vérifiez la présence de l'utilisateur actuel dans le stockage local
   const currentUser = localStorage.getItem('currentUser');

   if (currentUser) {
     return true;
   } else {
    console.log('hello')
     return false;
   }
};
