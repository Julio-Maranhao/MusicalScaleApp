import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { ApplicationPageComponent } from '../pages/application-page/application-page.component';
import { WhatsNewPageComponent } from '../pages/whats-new-page/whats-new-page.component';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomePageComponent},
  {path: 'app', component:ApplicationPageComponent},
  {path: 'whats-new', component:WhatsNewPageComponent},
  {path: '**', component:NotFoundPageComponent},
];
