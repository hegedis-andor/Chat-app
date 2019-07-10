import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;

  constructor() { }
}
