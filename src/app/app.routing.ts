import {RouterModule, Routes} from '@angular/router';
import * as CONST from './core/constants';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
const routes: Routes = [
  {path: '', redirectTo: CONST.frontendUrl.AUTH, pathMatch: 'full'},
  {
    path: CONST.frontendUrl.ZALO_APP,
    children: [
      {path: '', loadChildren: () => import('./feature/feature.module').then(value => value.FeatureModule) }
    ]
  },
  {
    path: CONST.frontendUrl.AUTH,
    children: [
      {path: '', loadChildren: () => import('./auth/auth.module').then(value => value.AuthModule)}
    ]
  },
  {path: CONST.frontendUrl.NOT_FOUND, component: NotFoundComponent}
];
export const AppRoutes = RouterModule.forRoot(routes);
