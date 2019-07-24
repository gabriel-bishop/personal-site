import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'projects', component: ProjectsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
