import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as CONST from '../../../core/constants';
import {Router} from '@angular/router';
import {ChatService} from '../../../core/services/chat.service';
import {RoomService} from '../../../core/services/room.service';
import {Room} from '../../../core/models/room';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  chatPage: boolean
  routing = CONST.frontendUrl;
  listRoom: Room[];
  selectedRoom: Room;
  @Input() user: User;
  @Output() getListMess = new EventEmitter<any>();
  private specialPages: any[] = [
    `/${this.routing.ZALO_APP}`,
    '/'
  ];
  private currentUrl = '';
  constructor(private router: Router,
              private roomService: RoomService,
              private userService: UserService) {
    this.router.events.subscribe((route: any) => {
      if (route.routerEvent) {
        this.currentUrl = route.routerEvent.url;
      } else {
        this.currentUrl = route.url;
      }
      this.chatPage = this.specialPages.indexOf(this.currentUrl) !== -1;
    });
  }
  ngOnInit(): void {
    this.roomService.getRoom().subscribe(res => {
      this.listRoom = res;
    });
    this.userService.currentUser.subscribe(value => {
      this.user = value;
    })
    this.roomService.currentRoom.subscribe(value => {
      this.selectedRoom = value
      this.getListMess.emit(this.selectedRoom);
    })
  }
  onGetRoom(room: Room) {

    this.selectedRoom = room;
    const user:User = JSON.parse(localStorage.getItem('user'));
    user.room = room.name;
    localStorage.setItem('room', JSON.stringify(room));
    this.router.navigate(['zalo','chat'])
  }

}
