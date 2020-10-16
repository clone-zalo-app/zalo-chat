import {NgModule} from '@angular/core';
import { ChatControllerComponent } from './components/chat-controller/chat-controller.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { MessengerItemComponent } from './components/messenger-item/messenger-item.component';

const routes: Routes = [
  {path: '', component: ChatPageComponent}
];
@NgModule({
  declarations: [ChatControllerComponent, ChatPageComponent, MessengerItemComponent],
  imports: [RouterModule.forChild(routes), SharedModule, ],

})
export class ChatModule {}
