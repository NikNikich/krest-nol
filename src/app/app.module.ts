import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreatFormComponent } from './creatform/creatform.component';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { DivWidthDirective } from './directives/div-width.directive';
import {DataGameService} from './datagame.service';
import {GameFieldService} from './gamefield.service';
import { ServerReqService } from './server-req.service';
import { HttpModule } from '@angular/http';
import { WaitComponent } from './wait/wait.component';
import { GameEndComponent } from './game-end/game-end.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatFormComponent,
    GameComponent,
    DivWidthDirective,
    WaitComponent,
    GameEndComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [DataGameService,GameFieldService,ServerReqService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
