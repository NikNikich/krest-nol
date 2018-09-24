import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class ServerReqService {
  constructor(private http: Http) {}
  getstate(game_token){
    const headers = new Headers({
      'access_token':game_token,
       });
    return this.http.get('http://localhost:3000/state', {headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      return Observable.throw('Сервер недоступен. Попробуйте позже.');
    })
  }
  getGameSess() {
    return this.http.get('http://localhost:3000/gamesess')
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw('Сервер недоступен. Попробуйте позже.');
      })
  }
  PutNewGame(user_game,sizeP,sizeV){
    const data = {
      user_game:user_game,
      csizeP: sizeP,
      sizeV:sizeV    };
      return this.http.post('http://localhost:3000/new_game', data)
        .map((response: Response) => response.json());     
  }
  PutJoinGame(game_token,user_game){
    const data = {
      game_token:game_token,
      user_game:user_game
       };
      return this.http.post('http://localhost:3000/join_game', data,)
        .map((response: Response) => response.json());     
  }
  PutJoinGameN(game_token,user_game){
    const data = {
      game_token:game_token,
      user_game:user_game
       };
      return this.http.post('http://localhost:3000/join_game_n', data,)
        .map((response: Response) => response.json());     
  }
  getAddGamer(accesToken) {
    const headers = new Headers({
      'access_token': accesToken
    });
    return this.http.get('http://localhost:3000/join_thisGame',{headers})
      .map((response: Response) => response.json())
  }
  PutClick(koorX,koorY,game_token){
    const headers = new Headers({
      'access_token':game_token,
       });
    const data = {
     row:koorX,
      col:koorY
       };

      return this.http.post('http://localhost:3000/make_a_move', data,{headers})
        .map((response: Response) => response.json());     
  
  }
}
