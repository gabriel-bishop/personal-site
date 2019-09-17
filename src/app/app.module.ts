import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { DragonComponent } from './dragon/dragon.component';
import {CommonService} from './common.service';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    DragonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule


  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
