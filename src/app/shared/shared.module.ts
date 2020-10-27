import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalUpdateProfileComponent } from './components/modal-update-profile/modal-update-profile.component';

@NgModule({
  declarations: [NotFoundComponent, ModalUpdateProfileComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  exports: [
    MDBBootstrapModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
