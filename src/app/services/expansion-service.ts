import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expansion } from '../shared/interfaces/expansion';
import { CreateExpansionDto } from '../pages/item-scraper-page/dialogs/add-expansion-dialog/create-expansion-dto';

@Injectable({
  providedIn: 'root'
})
export class ExpansionService {

  constructor(private http: HttpClient) { }

  getExpansions() {
    return this.http.get<Expansion[]>('/gestionnaire-collection-tcg/v1/expansions');
  }

  createExpansion(createExpansionDto: CreateExpansionDto) {
    return this.http.post<Expansion>(
      '/gestionnaire-collection-tcg/v1/expansions',
      createExpansionDto
    );
  }

}
