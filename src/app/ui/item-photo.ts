import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../menu-data';
import { Sticker } from './sticker';

/**
 * Shows the photo of a menu item. By default it looks for `public/menu/<id>.webp`;
 * set `image` on the item in menu-data.ts to use another file name.
 * If the photo is missing, the item's sticker is shown instead.
 */
@Component({
  selector: 'app-item-photo',
  imports: [Sticker],
  host: { class: 'flex size-full items-center justify-center overflow-hidden rounded-[inherit]' },
  template: `
    @if (!failed()) {
      <img
        [src]="src()"
        [alt]="item().title"
        loading="lazy"
        (error)="failed.set(true)"
        class="size-full object-contain p-2" />
    } @else {
      <app-sticker [name]="item().icon" class="size-3/4" />
    }
  `,
})
export class ItemPhoto {
  readonly item = input.required<MenuItem>();
  protected readonly failed = signal(false);

  protected src(): string {
    const i = this.item();
    return i.image ?? `menu/${i.id}.webp`;
  }
}
