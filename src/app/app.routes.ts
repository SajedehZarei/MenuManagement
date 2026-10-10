import { Routes } from '@angular/router';
import { CartPage } from './pages/cart/cart';
import { HomePage } from './pages/home/home';
import { MenuPage } from './pages/menu/menu';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Rosja' },
  { path: 'menu', component: MenuPage, title: 'منوی Rosja' },
  { path: 'cart', component: CartPage, title: 'سبد خرید | Rosja' },
  { path: '**', redirectTo: '' },
];
