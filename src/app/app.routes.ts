import { Routes } from '@angular/router';
import { CartPage } from './pages/cart/cart';
import { HomePage } from './pages/home/home';
import { MenuPage } from './pages/menu/menu';
import { FakeGatewayPage } from './pages/fake-gateway/fake-gateway';
import { PaymentResultPage } from './pages/payment-result/payment-result';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Rosja' },
  { path: 'menu', component: MenuPage, title: 'منوی Rosja' },
  { path: 'cart', component: CartPage, title: 'سبد خرید | Rosja' },
  { path: 'fake-gateway', component: FakeGatewayPage, title: 'درگاه آزمایشی | Rosja' },
  { path: 'payment/result', component: PaymentResultPage, title: 'نتیجه پرداخت | Rosja' },
  { path: '**', redirectTo: '' },
];
