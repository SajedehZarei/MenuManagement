import { Injectable, computed, effect, signal } from '@angular/core';
import { MENU_ITEMS, MenuItem } from './menu-data';

const KEY = 'rosja-cart';

export interface CartLine {
  item: MenuItem;
  qty: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly quantities = signal<Record<string, number>>(this.load());

  readonly lines = computed<CartLine[]>(() => {
    const q = this.quantities();
    return MENU_ITEMS.filter((i) => q[i.id] > 0).map((item) => ({
      item,
      qty: q[item.id],
      total: q[item.id] * item.price,
    }));
  });

  readonly count = computed(() => this.lines().reduce((a, l) => a + l.qty, 0));
  readonly subtotal = computed(() => this.lines().reduce((a, l) => a + l.total, 0));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.quantities()));
      } catch {
        /* storage unavailable */
      }
    });
  }

  qty(id: string): number {
    return this.quantities()[id] ?? 0;
  }

  add(id: string) {
    this.quantities.update((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }

  remove(id: string) {
    this.quantities.update((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  delete(id: string) {
    this.quantities.update((c) => {
      const { [id]: _, ...rest } = c;
      return rest;
    });
  }

  clear() {
    this.quantities.set({});
  }

  private load(): Record<string, number> {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '{}');
    } catch {
      return {};
    }
  }
}
