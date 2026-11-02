import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BasketApiService, ORDER_STATUS } from '../../api/basket-api.service';
import { OrderHistoryService, TrackedOrder, isValidPhone, normalizePhone } from '../../order-history.service';
import { Sticker } from '../../ui/sticker';

const REFRESH_MS = 20000;

@Component({
  selector: 'app-profile',
  imports: [RouterLink, Sticker],
  templateUrl: './profile.html',
})
export class ProfilePage implements OnInit, OnDestroy {
  private readonly history = inject(OrderHistoryService);
  private readonly api = inject(BasketApiService);

  private timer: ReturnType<typeof setInterval> | null = null;

  /** shomare-i ke karbar dar form type karde */
  protected readonly phoneInput = signal(this.history.profile()?.phone ?? '');
  /** shomare-i ke sefaresh-hayash neshun dade mishavad */
  protected readonly activePhone = signal(this.history.profile()?.phone ?? '');
  protected readonly formError = signal<string | null>(null);
  /** true agar vaziat-e lahzei-ye sefaresh az server gerefte nashod */
  protected readonly liveUnavailable = signal(false);
  protected readonly refreshing = signal(false);

  protected readonly orders = computed<TrackedOrder[]>(() => {
    const phone = this.activePhone();
    return phone ? this.history.ordersFor(phone)() : [];
  });

  protected readonly STEPS = [
    { status: ORDER_STATUS.created, label: 'ثبت شد' },
    { status: ORDER_STATUS.preparing, label: 'در حال آماده‌سازی' },
    { status: ORDER_STATUS.ready, label: 'آماده تحویل' },
  ];

  protected readonly ORDER_STATUS = ORDER_STATUS;

  ngOnInit() {
    this.refresh();
    this.timer = setInterval(() => this.refresh(), REFRESH_MS);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  protected input(e: Event) {
    this.phoneInput.set((e.target as HTMLInputElement).value);
  }

  protected submit() {
    const phone = normalizePhone(this.phoneInput());

    if (!isValidPhone(phone)) {
      this.formError.set('شماره موبایل معتبر وارد کنید (مثلاً ۰۹۱۲۳۴۵۶۷۸۹).');
      return;
    }

    this.formError.set(null);
    this.phoneInput.set(phone);
    this.activePhone.set(phone);

    const old = this.history.profile();
    this.history.setProfile({
      phone,
      firstName: old?.phone === phone ? old.firstName : '',
      lastName: old?.phone === phone ? old.lastName : '',
    });

    this.refresh();
  }

  protected changePhone() {
    this.activePhone.set('');
    this.history.setProfile(null);
    this.liveUnavailable.set(false);
  }

  /** vaziat-e sefaresh-haye hanuz-baz ra az server migirad (GetBasketById) */
  protected refresh() {
    const open = this.orders().filter(
      (o) => o.basketId && (o.status === ORDER_STATUS.created || o.status === ORDER_STATUS.preparing),
    );
    if (open.length === 0) return;

    this.refreshing.set(true);
    let pending = open.length;
    let failed = false;

    for (const order of open) {
      this.api.getBasketById(order.basketId!).subscribe({
        next: (res) => {
          const root = res?.result ?? res?.data ?? res;
          const status = Number(root?.orderStatus ?? root?.status);
          if (status >= 1 && status <= 4) this.history.updateStatus(order.basketId!, status);
        },
        error: (err: HttpErrorResponse) => {
          console.error('GetBasketById failed', err);
          failed = true;
          pending--;
          if (pending === 0) this.done(failed);
        },
        complete: () => {
          pending--;
          if (pending === 0) this.done(failed);
        },
      });
    }
  }

  private done(failed: boolean) {
    this.refreshing.set(false);
    this.liveUnavailable.set(failed);
  }

  protected typeLabel(o: TrackedOrder): string {
    if (o.orderType === 1) return o.tableNumber > 0 ? `داخل کافه · میز ${this.fmt(o.tableNumber)}` : 'داخل کافه';
    if (o.orderType === 2) return 'بیرون‌بر';
    if (o.orderType === 3) return 'ارسالی';
    return 'سفارش';
  }

  protected dateLabel(iso: string): string {
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? ''
      : new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }
}
