import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly cart = inject(CartService);
  protected readonly year = new Date().getFullYear().toLocaleString('fa-IR', { useGrouping: false });
}
