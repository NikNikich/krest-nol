import { Component, OnInit } from '@angular/core';
import {DataGameService} from '../datagame.service';
import { Router } from '@angular/router';
import { GameFieldService } from '../gamefield.service';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators';
import { Subscription,Observable, throwError } from 'rxjs';
import { ServerReqService } from '../server-req.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameConteiner = [];
  divPreop = [];
  winWay=[];
  gamerX='';
  gamerO='';
  numFlXG=0;
  gamerNow='';
  preopGame=[3,3];
  widthXCont="100px";
  widthXPole="600px";
  past:Date;
  timeClick=[0,0];
  Secunds='';
  flServerNot=false;
  flYourStep=false;
  private getTimer: Observable<any>;
  private subscription: Subscription;
  private getTimer2: Observable<any>;
  private subscription2: Subscription;

  constructor(private dataGameService:DataGameService,
    private router:Router,private gameFieldService:GameFieldService,
    private serverReqService:ServerReqService) {
      if(!this.dataGameService.flNewGame){
        this.router.navigate(['']);
      }
      this.serverReqService.getstate(this.dataGameService.accesToken)
      .subscribe((ses:any) => {
        this. GetOnInit(ses.field,ses.you_turn,ses.winner,ses.long_win);
      },
      error=>{
        this.flServerNot=true;
        throwError("Сервер Недоступпен .......(можно материться, но тихо). Попробуйтее позже")
      }
      );
     }

  ngOnInit() {
  }
  public GetOnInit(pole:Array<any>,flStep,winner,winLong){
    //================================================================================
    this.past=new Date();
    this.getTimer=interval(1000).pipe(
     map((x) => { 
        this.timeClick[1]=Math.floor((new Date().getTime()-this.past.getTime())/60000);
        this.timeClick[2]=(Math.floor((new Date().getTime()-this.past.getTime())/1000)-this.timeClick[1]*60);
        this.Secunds=( this.timeClick[2]<10)?("0"+this.timeClick[2]):(""+this.timeClick[2]);
        if(this.timeClick[1]>4){ this.Win(3,"",[]);}
        return x;
     })
     );
   //==================================================================================================
   this.getTimer2=interval(2000).pipe(
    map(() => { 
       this.GetStepTime();
    })
     );
    //==========================================================================
    if(flStep){
      this.numFlXG=this.dataGameService.numFLX;
    } else{
      this.numFlXG=(this.dataGameService.numFLX+1)%2;
      this.subscription2=this.getTimer2.subscribe();
    }
    if (winner.length>0){
      this.Win(2,winner,pole);
    }
    if (((pole.length)*(pole.length))<=this.gameFieldService.KolSimv(pole)){this.Win(3,"",[]);}
    this.dataGameService.preopNewGame[1]=pole.length;
    this.dataGameService.preopNewGame[2]=winLong;
    if(flStep){
      this.dataGameService.MassivKonv(pole);
      this.flYourStep=true;
    }
    this.gameConteiner=this.dataGameService.poleGame;
    this.gamerX=this.dataGameService.gamerX;
    this.gamerO=this.dataGameService.gamerO;
    this.gamerNow=(this.numFlXG==1)?this.gamerX:this.gamerO;
    this.preopGame=this.dataGameService.preopNewGame;
      
    this.subscription=this.getTimer.subscribe();
    var nn=this.preopGame[1];
    this.widthXCont=''+(600 - 600 % nn) / nn+'px';
    this.widthXPole=''+(600 - 600 % nn)+'px'
    this.divPreop=this.gameFieldService.datadiv(this.gameConteiner);
  }
  private GetStepTime(){
    this.serverReqService.getstate(this.dataGameService.accesToken)
    .subscribe((ses:any) => {
      if(ses.you_turn!=this.flYourStep){
        this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;}; 
        let currentUrl = this.router.url + '?'; 
        this.router.navigateByUrl(currentUrl) 
         .then(() => { 
          this.router.navigated = false; 
          this.router.navigate([this.router.url]); 
        }); 
      }
    },
    error=>{
      this.flServerNot=true;
      throwError("Сервер Недоступпен .......(можно материться, но тихо). Попробуйтее позже")
    }
    );
  }
 public ContClick(div){
    if(this.flYourStep){
      var koorX=Math.floor(parseInt(div.id,10)/10);
      var koorY=parseInt(div.id,10)%10;
      if((this.gameConteiner[koorX][koorY].search(/X/)<0)&&(this.gameConteiner[koorX][koorY].search(/O/)<0)){
      this.serverReqService.PutClick(koorX,koorY,this.dataGameService.accesToken)
      .subscribe((ses:any) => {
      },
      error=>{
        this.flServerNot=true;
        throwError("Сервер Недоступпен .......(можно материться, но тихо). Попробуйтее позже")
      }
      );
        this.dataGameService.GamerClick(koorX,koorY,this.numFlXG);
        this.winWay=this.gameFieldService.TestWin(this.gameConteiner,koorX,koorY,this.preopGame[2]);
        if(this.winWay.length>0){
          this.Win(1,"",[]);
      }else{
      this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;}; 
      let currentUrl = this.router.url + '?'; 
      this.router.navigateByUrl(currentUrl) 
       .then(() => { 
        this.router.navigated = false; 
        this.router.navigate([this.router.url]); 
      }); 
    }}
  }
}
private Win(indeks,winner,massiv){
  this.dataGameService.winIndex=indeks;
  if(indeks==2){
   // var massKor=this.gameFieldService.FindKoor(this.dataGameService.poleGame,massiv);
    this.dataGameService.MassivKonv(massiv);
    this.dataGameService.winGamer=winner;
    this.dataGameService.winNumFlX=this.numFlXG;
  }else if(indeks==1){
    this.dataGameService.winGamer=this.gamerNow;
    this.dataGameService.winNumFlX=this.numFlXG;
  }
  this.router.navigate(['/win']);
}
  ngOnDestroy() {
    if(this.dataGameService.flNewGame){
    this.subscription.unsubscribe();
    if(!this.flYourStep){
      this.subscription2.unsubscribe();   
    }
    }
  }
}
