import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { Sticker } from '../../ui/sticker';

type OrderType = 'dine' | 'takeaway';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, Sticker],
  templateUrl: './cart.html',
})
export class CartPage {
  protected readonly cart = inject(CartService);

  protected readonly orderType = signal<OrderType>('dine');
  protected readonly table = signal('');
  protected readonly name = signal('');
  protected readonly phone = signal('');
  protected readonly note = signal('');
  protected readonly orderNumber = signal<number | null>(null);

  protected readonly canSubmit = computed(() => {
    if (this.cart.count() === 0) return false;
    return this.orderType() === 'dine' ? this.table().trim() !== '' : this.name().trim() !== '' && this.phone().trim() !== '';
  });

  protected input(target: { set(v: string): void }, e: Event) {
    target.set((e.target as HTMLInputElement).value);
  }

  protected submit() {
    if (!this.canSubmit()) return;
    // TODO: send the order to your backend here
    this.orderNumber.set(Math.floor(100 + Math.random() * 900));
    this.cart.clear();
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }
}
