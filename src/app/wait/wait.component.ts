import { Component, OnInit } from '@angular/core';
import {DataGameService} from '../datagame.service';
import { Router } from '@angular/router';
import { ServerReqService } from '../server-req.service';
import { Subscription,Observable } from 'rxjs';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})
export class WaitComponent implements OnInit {
  colors=["hred","hblue","hgreen"];
  colorX=this.colors[0];
  nomC=0;
  private getTimer: Observable<any>;
  private subscription: Subscription;
  constructor(private dataGameService:DataGameService,
    private router:Router,
    private serverReqService:ServerReqService) { }
    flServerNot=false;
    private getGamerYes(gamer){
      this.dataGameService.gamerO=gamer;
      this.router.navigate(['/game']);  
    }
    private GetGamerInterval(){
      this.serverReqService.getAddGamer(this.dataGameService.accesToken)
      .subscribe((ses:any) => {
        if(ses.status=="yes"){ this.getGamerYes(ses.user);}
        this.nomC=(this.nomC+1)%3;
        this.colorX=this.colors[this.nomC];
      }),
      error=> {
        this.flServerNot=true;
      } ;
    }
  ngOnInit() {
    if(!this.dataGameService.flNewGame){
      this.router.navigate(['/']);
    }
    //======================================================
    this.getTimer=interval(2000).pipe(
      map(() => { 
        this.GetGamerInterval();
      })
    )
      //======================================================
    this.subscription=this.getTimer.subscribe();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
