import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DataGameService} from './datagame.service';
import { BrowserModule } from '@angular/platform-browser';
import { CssSelector, IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public router:Router
  ngOnInit(  ) { 
  }
}

