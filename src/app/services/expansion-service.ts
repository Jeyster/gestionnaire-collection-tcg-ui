import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expansion } from '../interfaces/expansion';

@Injectable({
  providedIn: 'root'
})
export class ExpansionService {

  constructor(private http: HttpClient) { }

  getExpansions() {
    return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/expansions');
  }

  getExpansionsByGame(gameId: string) {
    if (gameId === "") {
      return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/expansions');
    }
    return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/games/' + gameId + '/expansions');
  }

}
