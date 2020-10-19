import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as CONST from '../../../core/constants';
import {Router} from '@angular/router';
import {ChatService} from '../../../core/services/chat.service';
import {RoomService} from '../../../core/services/room.service';
import {Room} from '../../../core/models/room';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  chatPage: boolean
  routing = CONST.frontendUrl;
  listUser: UserModel[] = [];
  listRoom: [] = [];
  selectedRoom: Room;
  @Input() user: UserModel;
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
    this.userService.getListUser().subscribe(res => {
      res.data.forEach(user => {
        if (user.email !== this.user.email) {
          this.listUser.push(user);
        }
      })
    })
  }
  onGetRoom(room: UserModel) {

    this.router.navigate(['zalo','chat'])
  }

}
