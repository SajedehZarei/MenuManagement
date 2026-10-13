import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { PaymentService } from '../../payment.service';
import { ItemPhoto } from '../../ui/item-photo';
import { Sticker } from '../../ui/sticker';

type OrderType = 'dine' | 'takeaway';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, Sticker, ItemPhoto],
  templateUrl: './cart.html',
})
export class CartPage {
  protected readonly cart = inject(CartService);
  private readonly payment = inject(PaymentService);

  protected readonly orderType = signal<OrderType>('dine');
  protected readonly table = signal('');
  protected readonly name = signal('');
  protected readonly phone = signal('');
  protected readonly note = signal('');
  protected readonly orderNumber = signal<number | null>(null);
  protected readonly paying = signal(false);
  protected readonly payError = signal<string | null>(null);

  protected readonly canSubmit = computed(() => {
    if (this.cart.count() === 0) return false;
    return this.orderType() === 'dine' ? this.table().trim() !== '' : this.name().trim() !== '' && this.phone().trim() !== '';
  });

  protected input(target: { set(v: string): void }, e: Event) {
    target.set((e.target as HTMLInputElement).value);
  }

  protected async submit() {
    if (!this.canSubmit() || this.paying()) return;

    if (this.orderType() === 'takeaway') {
      // takeaway orders are paid online: go to the payment gateway
      this.paying.set(true);
      this.payError.set(null);
      try {
        await this.payment.start({
          customer: { name: this.name().trim(), phone: this.phone().trim() },
          note: this.note().trim(),
          amount: this.cart.subtotal(),
          items: this.cart.lines().map((l) => ({
            id: l.item.id,
            option: l.optionLabel,
            title: l.item.title,
            qty: l.qty,
            unitPrice: l.unitPrice,
          })),
          callbackUrl: `${window.location.origin}/payment/result`,
        });
        // the browser is being redirected; the cart is cleared only after a successful payment
      } catch {
        this.payError.set('اتصال به درگاه پرداخت برقرار نشد. لطفاً دوباره تلاش کنید.');
        this.paying.set(false);
      }
      return;
    }

    // dine-in: order is placed without online payment
    // TODO: send the order to your backend here
    this.orderNumber.set(Math.floor(100 + Math.random() * 900));
    this.cart.clear();
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }
}
