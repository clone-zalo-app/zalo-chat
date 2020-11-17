import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {UserModel} from '../../../core/models/user.model';
import {Router} from '@angular/router';
import {MDBModalService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-update-profile',
  templateUrl: './modal-update-profile.component.html',
  styleUrls: ['./modal-update-profile.component.scss']
})
export class ModalUpdateProfileComponent implements OnInit {

  user: UserModel;
  saveButtonClicked: Subject<any> = new Subject<any>();
  constructor(private router: Router,
              private modalService: MDBModalService) { }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.clear();
    this.modalService.hide(1);
    this.router.navigate(['auth', 'login']);

  }

}
