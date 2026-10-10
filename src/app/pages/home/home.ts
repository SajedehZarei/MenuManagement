import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sticker, StickerName } from '../../ui/sticker';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Sticker],
  templateUrl: './home.html',
})
export class HomePage {
  protected readonly features: { icon: StickerName; title: string; text: string }[] = [
    { icon: 'bean', title: 'دانه‌ی ممتاز', text: 'با دقت انتخاب‌شده برای بهترین طعم' },
    { icon: 'leaf', title: 'مواد طبیعی', text: 'خالص، تازه و واقعی' },
    { icon: 'cup', title: 'فضای دنج', text: 'جای دلخواه شما' },
  ];
}
