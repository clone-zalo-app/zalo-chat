import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NotFoundComponent],
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
