import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessItem} from '../../../../core/models/mess-item';
import {User} from '../../../../core/models/user';
import {ChatService} from '../../../../core/services/chat.service';
import {Router} from '@angular/router';
import {Room} from '../../../../core/models/room';
import {RoomService} from '../../../../core/services/room.service';
import {UserModel} from '../../../../core/models/user.model';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  SOCKET_ENDPOINT = 'localhost:3007';

  socket: any;
  messList: MessItem[] = [];
  user: UserModel;
  room: Room;
  @ViewChild('scrollMe', {static: false}) scrollFrame: ElementRef;

  constructor(private chatService: ChatService,
              private router: Router,
              private roomService: RoomService,
              ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.socket = this.chatService.connectSocket();


    this.jonRoom();
  }
  jonRoom() {
    this.user.room = '1';
    this.socket.emit('join', this.user, () => {
      this.getListChat();
    });
  }
  getListChat() {
    this.socket.on('message', (data: any) => {
      if (data.user !== this.user.email) {
        const mess: MessItem = {
          id: 1,
          content: data.text,
          user: this.user,
          time: '',
          send: true
        };
        this.messList.push(mess);
        this.onScrollTop();
      }
    });
  }



  onSend(messItem: MessItem) {
    // this.chatService.sendMessage(messItem.content);
    this.socket.emit('sendMessage', messItem.content, () => {
      messItem.send = true;
      this.messList.push(messItem);
      this.onScrollTop();
    });
  }

  onScrollTop() {
    this.scrollFrame.nativeElement.scrollTop = this.scrollFrame.nativeElement.scrollHeight;
  }


}
