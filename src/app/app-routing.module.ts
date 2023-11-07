import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactTrashComponent } from './contact-trash/contact-trash.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { loginGuardGuard } from './security/login/login-guard.guard';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'contact-list', component:ContactListComponent},
  {path: 'contact-detail/:id', component: ContactDetailComponent},
  {path: 'contact-add', component:ContactAddComponent},
  {path: 'contact-update/:id', component:ContactUpdateComponent},
  {path: 'contact-trash', component:ContactTrashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
