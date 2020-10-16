import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MessItem} from '../../../../core/models/mess-item';
import {User} from '../../../../core/models/user';

@Component({
  selector: 'app-chat-controller',
  templateUrl: './chat-controller.component.html',
  styleUrls: ['./chat-controller.component.scss']
})
export class ChatControllerComponent implements OnInit {

  send = false;
  mess: string;
  user: User;
  @Output() sendMess = new EventEmitter<any>()
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit(): void {
  }
  onCheck() {
    if (this.mess) {
     return  this.send = true;
    }
    this.send = false;
  }

  onSend() {
    const time = Date();
    let messItem: MessItem = {
      id: 1,
      content: this.mess,
      send: false,
      time: time,
      user: this.user
    }
    this.sendMess.emit(messItem);
    this.mess = '';
    this.send = false;
  }
  onLike() {
    const time = Date();
    let messItem: MessItem = {
      id: 1,
      content: 'like',
      send: false,
      time: time,
      user: this.user
    }
    this.sendMess.emit(messItem);
    this.mess = '';
  }

}
