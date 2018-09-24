import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameFieldService {
  public KolSimv(mass:Array<any>):number{
    var summ=0;
    for(var i=0;i<mass.length;i++ ){
      for(var j=0;j<mass[i].length;j++){
        if((mass[i][j].search(/X/)>-1)||(mass[i][j].search(/O/)>-1)){
          summ++;
        }    
    }  }
  return summ;
  }
  public FindKoor(mass1:Array<any>,mass2:Array<any>):Array<any>{
    var massKoor=[1,1];
    for(var i=0;i<mass1.length;i++ ){
      for(var j=0;j<mass1[i].length;j++){
         if (mass1[i][j]!=mass2[i][j]){
          massKoor[1]=i;
          massKoor[2]=j;
        }    
    }  }
  return massKoor;
  }
public datadiv(massValue:Array<any> ):Array<any>{ 
  var  gameCell=[];
  var div1='';
  for(var i=0;i<massValue.length;i++ )
  for(var j=0;j<massValue[i].length;j++){
    div1=''+(i*10+j);
      if (massValue[i][j]=='X'){
        gameCell.push({nameD:div1,class:"contX",value:massValue[i][j],flClick:false});
      } else  if (massValue[i][j]=='O'){
        gameCell.push({nameD:div1,class:"contO",value:massValue[i][j],flClick:false});
      } else{
        gameCell.push({nameD:div1,class:"contNull",value:"",flClick:true});
      }
  }
        return gameCell;
  }
  public TestWin(massValue:Array<any>,koorX:number,koorY:number,longWin:number):Array<any>{
    var stapWay=[[0,1],[1,0],[1,1],[-1,1]];//выигрышные пути
    var  winWay=[]; //Выигрышные комбинации 
    var betweenWay=[];//промежуточный массив для записи возможных комбинаций
    var testSymb=massValue[koorX][koorY];//символ, который будем сравнивать
    var flEndStap=false;//флаг окончания поиска в текущем выигрышном пути
    var lengtchMas=massValue.length;//размер игрового поля
    var betwLength=0;//счётчик выигрышного пути .... Пишу для себя, чтобы не запутаться
    var betwX, betwY;//промежуточные координаты добавил для понятности кода
    for(var i=0;i<4;i++){
      betwLength=0;
      flEndStap=false;
      betweenWay.length=0;
      var j=1;
      while(!flEndStap){
        betwX=koorX+j*stapWay[i][0];
        betwY=koorY+j*stapWay[i][1];
      if((betwX<lengtchMas)&&(betwY<lengtchMas)&&(betwX>-1)&&(betwY>-1)){
        if(massValue[betwX][betwY]==testSymb){
          betweenWay.push(betwX*10+betwY);
          betwLength++;
        } else{
          flEndStap=true;
        }
      } else{
        flEndStap=true;
      }
      j++;
      }
      //cikl na minus
      flEndStap=false;
      var j=1;
      while(!flEndStap){
        betwX=koorX-j*stapWay[i][0];
        betwY=koorY-j*stapWay[i][1];
      if((betwX<lengtchMas)&&(betwY<lengtchMas)&&(betwX>-1)&&(betwY>-1)){
        if(massValue[betwX][betwY]==testSymb){
          betweenWay.push(betwX*10+betwY);
          betwLength++;
        } else{
          flEndStap=true;
        }
      } else{
        flEndStap=true;
      }
      j++;
      }
      if(betwLength>(longWin-2)){
        betweenWay.push(koorX*10+koorY);
        winWay.push([]);
        betwLength=winWay.length-1;
        winWay[betwLength]=betweenWay.slice(0);
      }
    }
    return winWay;
  }
  public WinWay(massValue:Array<any>,way:Array<any> ):Array<any>{ 
    var  gameCell=[];
  var div1='';
  var flWay=0;
  for(var i=0;i<massValue.length;i++ )
  for(var j=0;j<massValue[i].length;j++){
    flWay=0;
    for(var ii=0;ii<way.length;ii++ ){
    for(var jj=0;jj<way[ii].length;jj++ ) {
      if((((way[ii][jj]-(way[ii][jj]%10))/10)==i)&&((way[ii][jj]%10)==j)){
        flWay=1;
      }
    } 
    }
    div1=''+(i*10+j);
    if (flWay==1){

    } else{
   // console.log(div1);
      if (massValue[i][j]=='X'){
        gameCell.push({nameD:div1,class:"contX",value:massValue[i][j],flClick:false});
      } else  if (massValue[i][j]=='O'){
        gameCell.push({nameD:div1,class:"contO",value:massValue[i][j],flClick:false});
      } else{
        gameCell.push({nameD:div1,class:"contNull",value:"",flClick:true});
      }
   }
}
  return gameCell;
  }    
}