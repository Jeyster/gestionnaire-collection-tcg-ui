import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../shared/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<Game[]>('/gestionnaire-collection-tcg/v1/games');
  }

  getGame(id: string) {
    return this.http.get<Game>('/gestionnaire-collection-tcg/v1/games/' + id);
  }

}
