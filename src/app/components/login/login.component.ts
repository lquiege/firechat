import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _chatServ:ChatService ) { }

  ngOnInit() {
  }

  login (provider:string){
    this._chatServ.login(provider);
  }
}
