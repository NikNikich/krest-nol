import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class DataGameService {
  preopNewGame=[7,5];
  poleGame=new Array<any>();
  gamerName="";
  gamerX='';
  gamerO='';
  numFLX=0;
  gameToken="";
  accesToken="";
  winIndex=0;
  winKoorX=0;
  winKoorY=0;
  winNumFlX=0;
  winGamer='';
  flNewGame=false;
  flCreateForm=true;
  flGame=false;
  flWatch=false;
  private router:Router;
/* public saysession():Array<any>{ 
       return[{
        "GameToken": "GG1",
        "GameName": "Петров-Васечкин"
      }, {
        "GameToken": "GG2",
        "GameName": "Сидоров-Сабитова"
      }, {
        "GameToken": "GG3",
        "GameName": "Гармаш-ПУСТО"
      }, {
        "GameToken": "GG4",
        "GameName": "Малинина-ПУСТО"
      }];
 }*/
 public postNewGame(longPole,longWin,nameGamer){
  this.flNewGame=true;
   this.preopNewGame[1]=parseInt(longPole);
   this.preopNewGame[2]=parseInt(longWin);
   this.gamerName=nameGamer;
   this.gamerX=nameGamer;
   this.gamerO='УВася';
   this.poleGame.length=0;
   for(var i=0;i<longPole;i++){
    this.poleGame[i]=[];
   for(var j=0;j<longPole;j++){
    this.poleGame[i][j]='?';
    }}
  this.flCreateForm=false;
  this.flGame=true;
  this.numFLX=1;
 }
 public GamerClick(korX,korY,flX){
   if (flX==0){
    this.poleGame[korX][korY]="O";
   } else {this.poleGame[korX][korY]="X";}
 }
 public MassivKonv(massGet:Array<any>){
  this.poleGame.length=0;
  for(var i=0;i<massGet.length;i++){
    this.poleGame[i]=[];
   for(var j=0;j<massGet.length;j++){
    this.poleGame[i][j]=massGet[i][j];
    }}
 }
}