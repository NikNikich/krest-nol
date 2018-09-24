import { Component, OnInit } from '@angular/core';
import {DataGameService} from '../datagame.service';
import { Router } from '@angular/router';
import { GameFieldService } from '../gamefield.service';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.css']
})
export class GameEndComponent implements OnInit {
  gameConteiner = [];
  gamer='';
  numFlXG=0;
  flNeopred=false;
  divPreop = [];
  winWay=[];
  gamerNow='';
  preopGame=[3,3];
  widthXCont="100px";
  widthXPole="600px";


  constructor(private dataGameService:DataGameService,
    private router:Router,private gameFieldService:GameFieldService,) { 
      if(!this.dataGameService.flNewGame){
        this.router.navigate(['']);
      }
    }
  ngOnInit() {
    if(this.dataGameService.winIndex==3){
      this.flNeopred=true;
    }
    this.gameConteiner=this.dataGameService.poleGame;
    this.gamer=this.dataGameService.winGamer;
    this.numFlXG=this.dataGameService.winNumFlX;
    this.preopGame=this.dataGameService.preopNewGame;
    var nn=this.preopGame[1];
    this.widthXCont=''+(600 - 600 % nn) / nn+'px';
    this.widthXPole=''+(600 - 600 % nn)+'px';
    this.divPreop=this.gameFieldService.datadiv(this.gameConteiner);
   // this.winWay=this.gameFieldService.TestWin(this.gameConteiner,this.dataGameService.winKoorX,this.dataGameService.winKoorY,this.preopGame[2]);
  }
  public OsnStr(){
    this.router.navigate(['']);
  }

}
