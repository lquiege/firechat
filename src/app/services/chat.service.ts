import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Message } from '../interface/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats:Message[] =[];
  public user:any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(userLoaded=>{
      if(!userLoaded) return;
      this.user.name=userLoaded.displayName;
      this.user.uid=userLoaded.uid;
    });
  }

  login(provider:string) {
    if (provider==='google'){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  } else {
    this.user.email="";
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider() );
    }
  }
  logout() {
    this.user= {};
    this.afAuth.auth.signOut();
  }

  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref=>ref.orderBy('date','desc').limit(5));
    //Con angular 6 hay que importar el map y abarcarlo dentro de un pipe en el observable que vayamos a utilizarj
    return this.itemsCollection.valueChanges().pipe(map((messages:Message[])=>{
        console.log(messages);
        this.chats=[];
        for (let message of messages){
          this.chats.unshift(message);
        }
        return this.chats;
    }))
  }

  addMessages(text:string){
    let mes:Message = {
      name: this.user.name,
      message:text,
      date: new Date().getTime(),
      userId: this.user.uid
    }
    return this.itemsCollection.add(mes);
  }
}
