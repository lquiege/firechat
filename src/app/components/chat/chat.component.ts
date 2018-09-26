import { Component, OnInit } from '@angular/core';
import { ChatService} from '../../services/chat.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  message:string="";
  element: any;
  constructor(public _chatServ: ChatService) {
    this._chatServ.loadMessages().subscribe( ()=>{
      setTimeout( ()=>{
        this.element.scrollTop=this.element.scrollHeight;
      },20)

    });

    }


  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }



  send_message(){
    console.log(this.message);
    if (this.message.length==0){
      return;
    }
    this._chatServ.addMessages(this.message);
  }



}
