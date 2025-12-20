import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {

  goBack() {
      window.history.back();
  }

}
