import {Component, Input, OnInit} from '@angular/core';
import {MessItem} from '../../../../core/models/mess-item';
import {User} from '../../../../core/models/user';

@Component({
  selector: 'app-messenger-item',
  templateUrl: './messenger-item.component.html',
  styleUrls: ['./messenger-item.component.scss']
})
export class MessengerItemComponent implements OnInit {

  @Input() mess: MessItem;
  user: User;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    console.log(this.user)
    console.log(this.mess)

  }

}
