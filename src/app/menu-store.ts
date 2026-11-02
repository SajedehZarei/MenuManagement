import { Injectable, inject, signal } from '@angular/core';
import { MenuApiService } from './api/menu-api.service';
import { Category, MenuItem } from './menu-data';

/** Menu data loaded from the Swagger backend (shared by the menu and cart pages). */
@Injectable({ providedIn: 'root' })
export class MenuStore {
  private readonly api = inject(MenuApiService);

  readonly categories = signal<Category[]>([]);
  readonly items = signal<MenuItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.api.getMenu().subscribe({
      next: ({ categories, items }) => {
        this.categories.set(categories);
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('دریافت منو از سرور ممکن نشد');
        this.loading.set(false);
      },
    });
  }
}
