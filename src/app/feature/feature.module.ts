import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { FooterComponent } from './main-layout/footer/footer.component';
import { NavbarComponent } from './main-layout/navbar/navbar.component';
import {FeatureComponent} from './feature.component';
import {RouterModule, Routes} from '@angular/router';
import * as CONST from '../core/constants';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path: '', component: FeatureComponent, children: [
      {path: '', component: HomeComponent},
      {path: CONST.frontendUrl.CHAT, loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)},
    ]}
];
@NgModule({
  declarations: [FooterComponent, NavbarComponent, FeatureComponent, HomeComponent],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FeatureModule {}
