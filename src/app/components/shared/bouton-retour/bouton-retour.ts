import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-bouton-retour',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './bouton-retour.html',
  styleUrl: './bouton-retour.css',
})
export class BoutonRetour {

  goBack() {
      window.history.back();
  }

}
