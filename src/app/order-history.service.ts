import { Injectable, computed, effect, signal } from '@angular/core';

const ORDERS_KEY = 'rosja-orders';
const PROFILE_KEY = 'rosja-profile';

/** sefaresh-i ke az hamin dastgah sabt shode */
export interface TrackedOrder {
  /** id-e sabad dar backend (agar az javab-e AddBasket peyda shod) */
  basketId: string | null;
  phone: string;
  orderNumber: string | null;
  orderType: number;
  tableNumber: number;
  createdAt: string;
  items: { title: string; qty: number }[];
  /** 1 = ثبت شد، 2 = در حال آماده‌سازی، 3 = آماده شد، 4 = لغو شد */
  status: number;
}

export interface CustomerProfile {
  phone: string;
  firstName: string;
  lastName: string;
}

/** adad-haye farsi/arabi -> englisi va hazf-e fasele */
export function normalizePhone(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/\s|-/g, '');
}

export function isValidPhone(value: string): boolean {
  return /^09\d{9}$/.test(value);
}

@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  private readonly all = signal<TrackedOrder[]>(this.read<TrackedOrder[]>(ORDERS_KEY, []));
  readonly profile = signal<CustomerProfile | null>(this.read<CustomerProfile | null>(PROFILE_KEY, null));

  constructor() {
    effect(() => this.write(ORDERS_KEY, this.all()));
    effect(() => this.write(PROFILE_KEY, this.profile()));
  }

  /** sefaresh-haye in shomare (jadid be ghadim) */
  ordersFor(phone: string) {
    return computed(() =>
      this.all()
        .filter((o) => o.phone === phone)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  }

  add(order: TrackedOrder) {
    this.all.update((list) => [order, ...list].slice(0, 50));
  }

  updateStatus(basketId: string, status: number) {
    this.all.update((list) => list.map((o) => (o.basketId === basketId ? { ...o, status } : o)));
  }

  setProfile(profile: CustomerProfile | null) {
    this.profile.set(profile);
  }

  private read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private write(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }
}
