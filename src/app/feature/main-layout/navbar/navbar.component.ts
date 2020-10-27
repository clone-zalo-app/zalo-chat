import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import * as CONST from '../../../core/constants';
import {Router} from '@angular/router';
import {ChatService} from '../../../core/services/chat.service';
import {RoomService} from '../../../core/services/room.service';
import {Room} from '../../../core/models/room';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';
import {UserModel} from '../../../core/models/user.model';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {ModalUpdateProfileComponent} from '../../../shared/components/modal-update-profile/modal-update-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  chatPage: boolean;
  modalRef: MDBModalRef;

  routing = CONST.frontendUrl;
  listUser: UserModel[] = [];
  listRoom: Room[] = [
    {id: 1,name:'Công nghê mới'},
    {id: 2,name:'Quản lý dự án'},
    {id: 3,name:'Trí tuệ nhân tạo'}
  ]
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
              private userService: UserService,
              private modalService: MDBModalService,) {
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
  }
  onGetRoom(room: Room) {
    this.router.navigate(['zalo','chat',room.id])
  }
  updateProfile() {
    const modalOptions = {
      data: {
        user: this.user
      },
    };
    this.modalRef = this.modalService.show(ModalUpdateProfileComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((user: UserModel) => {
      this.user = user;
    });
  }

}
