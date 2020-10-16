import {Component, OnInit} from '@angular/core';

import {User} from '../core/models/user';
import {Room} from '../core/models/room';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  user: User;
  room: Room;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

  }
  onGetRoom(value) {
    this.room = value;
  }

}
