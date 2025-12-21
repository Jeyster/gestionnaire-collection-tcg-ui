import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locale } from '../shared/interfaces/locale';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private http: HttpClient) { }

  getLocales() {
    return this.http.get<Locale[]>('/gestionnaire-collection-tcg/v1/locales');
  }

}
