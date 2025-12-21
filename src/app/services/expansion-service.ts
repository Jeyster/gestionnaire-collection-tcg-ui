import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expansion } from '../shared/interfaces/expansion';

@Injectable({
  providedIn: 'root'
})
export class ExpansionService {

  constructor(private http: HttpClient) { }

  getExpansions() {
    return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/expansions');
  }

}
