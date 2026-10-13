import { Injectable, computed, effect, signal } from '@angular/core';
import { MENU_ITEMS, MenuItem } from './menu-data';

const KEY = 'rosja-cart';

export interface CartLine {
  /** key used in the cart: `<id>` or `<id>:<optionId>` */
  key: string;
  item: MenuItem;
  optionLabel?: string;
  unitPrice: number;
  qty: number;
  total: number;
}

/** Cart key for an item + (optional) variant. */
export function lineKey(itemId: string, optionId?: string): string {
  return optionId ? `${itemId}:${optionId}` : itemId;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly quantities = signal<Record<string, number>>(this.load());

  readonly lines = computed<CartLine[]>(() => {
    const q = this.quantities();
    const lines: CartLine[] = [];
    for (const item of MENU_ITEMS) {
      if (item.options?.length) {
        for (const opt of item.options) {
          const key = lineKey(item.id, opt.id);
          const qty = q[key] ?? 0;
          if (qty > 0) lines.push({ key, item, optionLabel: opt.label, unitPrice: opt.price, qty, total: qty * opt.price });
        }
      } else {
        const qty = q[item.id] ?? 0;
        if (qty > 0) lines.push({ key: item.id, item, unitPrice: item.price, qty, total: qty * item.price });
      }
    }
    return lines;
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
