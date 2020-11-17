import {Component, OnInit} from '@angular/core';

import {Room} from '../core/models/room';
import {UserModel} from '../core/models/user.model';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  user: UserModel;
  room: Room;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
  }
  onGetRoom(value) {
    this.room = value;
  }

}
