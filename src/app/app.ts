import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class App {
}
