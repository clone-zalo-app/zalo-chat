import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {Room} from '../models/room';


@Injectable({
  providedIn: 'root'
})
export class ChatService extends CommonService{

  private socket: any;

  connectSocket(){
    return this.socket = io(this.chatUrl);
  }



}
