import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringUtil {

  toLocalISOString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T00:00:00`;
  }

}
