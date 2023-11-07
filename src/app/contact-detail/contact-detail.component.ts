import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{

  contactId = 0;
  currentContact: any;
  db= JSON.parse(localStorage.getItem('users') || '[]')
  currentUserId = JSON.parse(localStorage.getItem('currentUser') || '[]')
  currentUserObj: any;
  contactInfo:any;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.contactId = +this.route.snapshot.params['id'];

    this.currentUserObj = this.db.find((user:any) => user.id == this.currentUserId)

    this.contactInfo = (this.currentUserObj.contact).find((element:any) => element.id == this.contactId);

  }


}
