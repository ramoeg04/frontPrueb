import { RouterModule, Routes } from '@angular/router';
import {SoniatComponent} from './soniat/soniat.component';

const routes: Routes = [
  { path: 'soniat', component: SoniatComponent },
  {path : '', component : SoniatComponent}
];

export const routing = RouterModule.forRoot(routes);
