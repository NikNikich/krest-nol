import { Component} from '@angular/core';
import {DataGameService} from '../datagame.service';
import { Router } from '@angular/router';
import { ServerReqService } from '../server-req.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './creatform.html',
  styleUrls: ['./creatform.component.css']
})
export class CreatFormComponent {
public ses1:Array<any>;
public sesOsn:Array<any>;
_selectActSes = [];
idSelectGame="";
  constructor(private dataGameService:DataGameService,
    private router:Router,
    private serverReqService:ServerReqService ) {
      
  }
  sizePoles=[
    { "id": 1, "name": "3" }, 
    { "id": 2, "name": "4" }, 
    { "id": 3, "name": "5" }, 
    { "id": 4, "name": "6" }, 
    { "id": 5, "name": "7" }, 
    { "id": 6, "name": "8" }, 
    { "id": 7, "name": "9" }, 
    { "id": 8, "name": "10" }
  ];
  nameGamer="";
  ngOnInit() { 
  this.nameGamer = "Ваш псевдоним";
  }
  flErrSess=false;
  flNoCgange=true;
  flSizeWin=false;
  flelectSess=false;
  flServerNot=false;
  public selectActSes1="";
  selectSizePole="1";
  selectSizeKomb="1";
  errSessText="Вы не выбрали партию";
  textButGet="Присоедениться к партии";
  selectSes="НЕ выбрано";
  private clickSesYes(ses:Array<any>){
    this.flServerNot=false;
    this.sesOsn=ses;
    this._selectActSes.length=0;
    var title="";
      for(var i=1;i<this.sesOsn.length+1;i++){
        title=''+this.sesOsn[(i-1)].user1+" - "+this.sesOsn[(i-1)].user2
        this._selectActSes.push({"id":""+i,"name":title});
       }
  }
  public clickSess(){
    this.serverReqService.getGameSess()
      .subscribe((ses:Array<any>) => {
       this.clickSesYes(ses);
      }),
      error=> {
        this.flServerNot=true;
      } ;
      
  }
  public selectSessCh(id){
    if( this.selectActSes1.length<1){
      this.flNoCgange=true;
      this.selectSes="НЕ выбрано";
    } else{
      this.flNoCgange=false;
      this.flErrSess=false;
    id=parseInt(this.selectActSes1,10)-1;
  //  if (this.sesOsn[id].flag=="true"){this.textButGet="Играть ноликами"} else {this.textButGet="Наблюдать за партией"}
    this.textButGet="Играть ноликами"
    this.selectSes=''+this.sesOsn[id].user1+" - "+this.sesOsn[id].user2;
    this.idSelectGame=id;
    }
  }
  public selectPoleCh(id){
    if( parseInt(id,10)>2){
      this.flSizeWin=true;
    } else{
      this.flSizeWin=false;
      this.selectSizeKomb="1";
    }
  }
  private NewGameYes(gameToken,accesToken){
    var pole=parseInt(this.selectSizePole,10)+2;
    var winlong=(parseInt(this.selectSizeKomb,10)==1)?3:5;
    this.dataGameService.gameToken=gameToken;
    this.dataGameService.accesToken=accesToken;
    this.dataGameService.postNewGame(pole,winlong,this.nameGamer);
    this.router.navigate(['/wait']);
  }
  public NewGame(){
    var pole=parseInt(this.selectSizePole,10)+2;
    var winlong=(parseInt(this.selectSizeKomb,10)==1)?3:5;
    var gameToken="dfgfghj";
    var accesToken="534534gdfgd";
    this.serverReqService.PutNewGame(this.nameGamer,pole,winlong)
    .subscribe((ses:any) => {
      gameToken=ses.game_token;
      accesToken=ses.acces_token;
      this.NewGameYes(gameToken,accesToken);
    },
    error=>{
      this.flServerNot=true;
      throwError("Сервер Недоступпен .......(можно материться, но тихо). Попробуйтее позже")
    }
    );
  }

  public GetActSess(){
    this.serverReqService.getGameSess()
      .subscribe((ses:Array<any>) => {
       this.clickSesYes(ses);
       this.flelectSess=true;
      }),
      error=> {
        this.flServerNot=true;
      } ;
  }
  private GetOnSessYes(acceToken){
    acceToken="76456787967";
    this.dataGameService.gamerX=this.sesOsn[this.idSelectGame].user1;
    this.dataGameService.gamerO=this.nameGamer;
   // this.dataGameService.gamerO=((this.sesOsn[this.idSelectGame].flag=="true")?this.nameGamer:this.sesOsn[this.idSelectGame].user1);
   // this.dataGameService.flWatch=((this.sesOsn[this.idSelectGame].flag=="true")?false:true);
    this.dataGameService.flNewGame=true;
    this.dataGameService.numFLX=0;
    this.dataGameService.accesToken=acceToken;
    this.router.navigate(['/game']);
  }
  public GetOnSess(){
   if(this.flNoCgange){
     this.flErrSess=true
    } else{
     // if(this.sesOsn[this.idSelectGame].flag=="true"){
        this.serverReqService.PutJoinGame(this.sesOsn[this.idSelectGame].id,this.nameGamer)
        .subscribe((ses:any) => {
          this.GetOnSessYes(ses.acces_token);
         }),
         error=> {
          this.flServerNot=true;
         } ;
     /* } else {
        this.serverReqService.PutJoinGameN(this.sesOsn[this.idSelectGame].id,this.nameGamer)
         .subscribe((ses:any) => {
           this.GetOnSessYes(ses.acces_token);
        }),
       error=> {
          this.flServerNot=true;
        } ;
      }*/
   }
  }
}
