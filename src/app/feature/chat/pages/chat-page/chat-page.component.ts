import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessItem} from '../../../../core/models/mess-item';
import {User} from '../../../../core/models/user';
import {ChatService} from '../../../../core/services/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  room: String;
  @ViewChild('scrollMe', {static: false}) scrollFrame: ElementRef;

  constructor(private chatService: ChatService,
              private router: Router,
              private route: ActivatedRoute,
              private roomService: RoomService,
              ) {
     this.room = this.route.snapshot.paramMap.get('id');
    chatService.currentUser.subscribe(value => this.user = value)
  }

  ngOnInit() {
    this.socket = this.chatService.connectSocket();
    this.jonRoom();
  }
  jonRoom() {
    const request = {name: this.user.email, room: this.room}
    this.socket.emit('join', request,() => {
    });
  }
  // getListChat() {
  //   this.socket.on('message', (data: any) => {});
  // }



  onSend(messItem: MessItem) {
    console.log(messItem);
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
