import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expansion } from '../shared/interfaces/expansion';
import { CreateExpansion } from '../pages/item-scraper-page/dialogs/add-expansion-dialog/create-expansion';

@Injectable({
  providedIn: 'root'
})
export class ExpansionService {

  constructor(private http: HttpClient) { }

  getExpansions() {
    return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/expansions');
  }

  createExpansion(createExpansionDto: CreateExpansion) {
    return this.http.post<Expansion>(
      '/gestionnaire-collection-tcg/v1/expansions',
      createExpansionDto
    );
  }

}
