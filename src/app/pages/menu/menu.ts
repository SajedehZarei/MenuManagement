import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { Sticker } from '../../ui/sticker';
import { CATEGORIES, CategoryId, MENU_ITEMS, MenuItem } from '../../menu-data';

@Component({
  selector: 'app-menu',
  imports: [Sticker, RouterLink],
  templateUrl: './menu.html',
})
export class MenuPage {
  protected readonly categories = CATEGORIES;
  protected readonly items = MENU_ITEMS;


  protected readonly activeCategory = signal<CategoryId | 'all'>('all');
  protected readonly query = signal('');
  private readonly cartService = inject(CartService);
  protected readonly cartCount = this.cartService.count;
  protected readonly cartTotal = this.cartService.subtotal;

  protected readonly filtered = computed<MenuItem[]>(() => {
    const cat = this.activeCategory();
    const q = this.query().trim();
    return this.items.filter(
      (i) =>
        (cat === 'all' || i.category === cat) &&
        (!q || i.title.includes(q) || i.description.includes(q)),
    );
  });

  protected select(id: CategoryId | 'all') {
    this.activeCategory.set(id);
  }

  protected onSearch(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected qty(id: string): number {
    return this.cartService.qty(id);
  }

  protected add(id: string) {
    this.cartService.add(id);
  }

  protected remove(id: string) {
    this.cartService.remove(id);
  }

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }
}
