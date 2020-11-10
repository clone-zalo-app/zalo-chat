import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ModalUpdateProfileComponent } from './components/modal-update-profile/modal-update-profile.component';
import { AlertSystemComponent } from './components/alert-system/alert-system.component';

@NgModule({
  declarations: [NotFoundComponent, ModalUpdateProfileComponent, AlertSystemComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule
  ],
    exports: [
        MDBBootstrapModule,
        CommonModule,
        FormsModule,
        AlertSystemComponent
    ]
})
export class SharedModule {}
