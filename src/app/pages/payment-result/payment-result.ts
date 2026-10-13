import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../cart.service';
import { Sticker } from '../../ui/sticker';

/**
 * Landing page after the payment gateway: /payment/result?status=success|failed&order=<number>
 * The real verification must happen on your server before it redirects here.
 */
@Component({
  selector: 'app-payment-result',
  imports: [RouterLink, Sticker],
  templateUrl: './payment-result.html',
})
export class PaymentResultPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);

  protected readonly success = this.route.snapshot.queryParamMap.get('status') === 'success';
  protected readonly order = this.route.snapshot.queryParamMap.get('order');

  ngOnInit() {
    if (this.success) this.cart.clear();
  }

  protected fmt(n: string): string {
    return Number(n).toLocaleString('fa-IR');
  }
}
