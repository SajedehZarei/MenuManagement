import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ORDER_TYPE, BasketApiService, extractBasketId } from '../../api/basket-api.service';
import { OrderHistoryService, normalizePhone } from '../../order-history.service';
import { CartService } from '../../cart.service';
import { ItemPhoto } from '../../ui/item-photo';
import { Sticker } from '../../ui/sticker';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, Sticker, ItemPhoto],
  templateUrl: './cart.html',
})
export class CartPage {
  protected readonly cart = inject(CartService);
  private readonly basketApi = inject(BasketApiService);
  private readonly history = inject(OrderHistoryService);

  protected readonly ORDER_TYPE = ORDER_TYPE;
  /** order type option (radio): 1 = in cafe, 2 = takeaway, 3 = delivery */
  protected readonly orderType = signal<number>(ORDER_TYPE.dineIn);
  protected readonly table = signal('');
  protected readonly firstName = signal(this.history.profile()?.firstName ?? '');
  protected readonly lastName = signal(this.history.profile()?.lastName ?? '');
  protected readonly phone = signal(this.history.profile()?.phone ?? '');
  protected readonly placed = signal(false);
  protected readonly orderNumber = signal<string | number | null>(null);
  protected readonly sending = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly canSubmit = computed(() => {
    if (this.cart.count() === 0) return false;
    if (!this.firstName().trim() || !this.lastName().trim() || !this.phone().trim()) return false;
    return this.orderType() !== ORDER_TYPE.dineIn || this.table().trim() !== '';
  });

  protected readonly hint = computed(() => {
    if (this.orderType() === ORDER_TYPE.dineIn && !this.table().trim()) return 'شماره میز را وارد کنید';
    return 'نام، نام خانوادگی و شماره تماس را وارد کنید';
  });

  protected input(target: { set(v: string): void }, e: Event) {
    target.set((e.target as HTMLInputElement).value);
  }

  protected submit() {
    if (!this.canSubmit() || this.sending()) return;

    // one entry per menu item (sum quantities if the same item appears in several lines)
    const qty = new Map<string, number>();
    for (const l of this.cart.lines()) qty.set(l.item.id, (qty.get(l.item.id) ?? 0) + l.qty);

    const dine = this.orderType() === ORDER_TYPE.dineIn;
    this.sending.set(true);
    this.error.set(null);

    this.basketApi
      .addBasket({
        phoneNumber: this.phone().trim(),
        firstName: this.firstName().trim(),
        lastName: this.lastName().trim(),
        orderType: this.orderType(),
        tableNumber: dine ? Number(this.table()) || 0 : 0,
        basketItemList: [...qty].map(([menuItemId, quantity]) => ({ menuItemId, quantity })),
      })
      .subscribe({
        next: (res) => {
          const r = res?.result ?? res?.data ?? res;
          this.orderNumber.set(r?.orderNumber ?? r?.number ?? null);

          // baraye safhe-ye profile: sefaresh va profile-e moshtari ra zakhire mikonim
          const phone = normalizePhone(this.phone().trim());
          this.history.add({
            basketId: extractBasketId(res),
            phone,
            orderNumber: this.orderNumber() === null ? null : String(this.orderNumber()),
            orderType: this.orderType(),
            tableNumber: dine ? Number(this.table()) || 0 : 0,
            createdAt: new Date().toISOString(),
            items: this.cart.lines().map((l) => ({
              title: l.optionLabel ? `${l.item.title} (${l.optionLabel})` : l.item.title,
              qty: l.qty,
            })),
            status: 1,
          });
          this.history.setProfile({
            phone,
            firstName: this.firstName().trim(),
            lastName: this.lastName().trim(),
          });

          this.placed.set(true);
          this.cart.clear();
          this.sending.set(false);
        },
        error: () => {
          this.error.set('ثبت سفارش انجام نشد. لطفاً دوباره تلاش کنید.');
          this.sending.set(false);
        },
      });
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }
}
