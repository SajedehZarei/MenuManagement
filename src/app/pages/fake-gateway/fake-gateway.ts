import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Fake payment gateway for testing the takeaway flow. Not for production. */
@Component({
  selector: 'app-fake-gateway',
  templateUrl: './fake-gateway.html',
})
export class FakeGatewayPage {
  private readonly router = inject(Router);
  private readonly params = inject(ActivatedRoute).snapshot.queryParamMap;

  protected readonly amount = Number(this.params.get('amount') ?? 0);
  protected readonly order = this.params.get('order') ?? '';

  protected fmt(n: number): string {
    return n.toLocaleString('fa-IR');
  }

  protected finish(success: boolean) {
    this.router.navigate(['/payment/result'], {
      queryParams: { status: success ? 'success' : 'failed', order: this.order },
    });
  }
}
