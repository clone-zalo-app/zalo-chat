import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessItem} from '../../../../core/models/mess-item';
import {ChatService} from '../../../../core/services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  room: String;
  @ViewChild('scrollMe', {static: false}) scrollFrame: ElementRef;

  constructor(private chatService: ChatService,
              private router: Router,
              private route: ActivatedRoute,
              private roomService: RoomService,
  ) {
    this.room = this.route.snapshot.paramMap.get('id');
    chatService.currentUser.subscribe(value => this.user = value);
  }

  ngOnInit() {
    this.socket = this.chatService.connectSocket();
    this.jonRoom();
    this.getListChat();
  }

  jonRoom() {
    const request = {name: this.user.email, room: this.room};
    this.socket.emit('join', request, () => {
    });
  }

  getListChat() {
    const time = Date();
    this.socket.on('message', (data: any) => {
      let user: UserModel = {
        email: data.user
      }
      let messItem: MessItem = {
        content: data.text,
        user: user,
        send: true,
        time: time
      }
      this.messList.push(messItem)
      this.onScrollTop();
    });
  }


  onSend(messItem: MessItem) {
    this.socket.emit('sendMessage', messItem.content, () => {
      messItem.send = true;
      this.onScrollTop();
    });
  }

  onScrollTop() {
    this.scrollFrame.nativeElement.scrollTop = this.scrollFrame.nativeElement.scrollHeight;
  }


}
