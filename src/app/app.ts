import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatTooltip,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
}
