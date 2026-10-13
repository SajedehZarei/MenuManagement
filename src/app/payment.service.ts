import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Backend endpoint that creates a payment with your gateway (Zarinpal, IDPay, ...)
 * and returns `{ paymentUrl: string }`. Replace with your real address.
 *
 * The gateway must send the customer back to `callbackUrl`
 * (`/payment/result?status=success|failed&order=<number>`) after verifying on the server.
 */
export const PAYMENT_START_URL = '/api/payment/start';

/**
 * true  → use the built-in fake gateway page (/fake-gateway) for testing, no backend needed.
 * false → call PAYMENT_START_URL and redirect to the real gateway.
 */
export const USE_FAKE_GATEWAY = true;

export interface PaymentRequest {
  customer: { name: string; phone: string };
  note: string;
  amount: number; // تومان
  items: { id: string; option?: string; title: string; qty: number; unitPrice: number }[];
  callbackUrl: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly router = inject(Router);

  /** Creates the payment and sends the browser to the gateway page. */
  async start(req: PaymentRequest): Promise<void> {
    if (USE_FAKE_GATEWAY) {
      const order = Math.floor(100 + Math.random() * 900);
      await this.router.navigate(['/fake-gateway'], { queryParams: { amount: req.amount, order } });
      return;
    }

    const res = await fetch(PAYMENT_START_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`payment start failed: ${res.status}`);

    const data = (await res.json()) as { paymentUrl?: string };
    if (!data.paymentUrl) throw new Error('payment url missing');

    window.location.href = data.paymentUrl;
  }
}
