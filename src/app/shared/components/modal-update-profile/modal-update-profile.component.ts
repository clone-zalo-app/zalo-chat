import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {UserModel} from '../../../core/models/user.model';

@Component({
  selector: 'app-modal-update-profile',
  templateUrl: './modal-update-profile.component.html',
  styleUrls: ['./modal-update-profile.component.scss']
})
export class ModalUpdateProfileComponent implements OnInit {

  user: UserModel;
  saveButtonClicked: Subject<any> = new Subject<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
