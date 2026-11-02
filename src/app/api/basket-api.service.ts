import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from './api.config';

/** orderType values expected by the backend: 1 = in cafe, 2 = takeaway, 3 = delivery. */
export const ORDER_TYPE = { dineIn: 1, takeaway: 2, delivery: 3 } as const;

export interface AddBasketRequest {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  orderType: number;
  tableNumber: number;
  basketItemList: { menuItemId: string; quantity: number }[];
}

/** orderStatus az backend: 1 = ثبت شد، 2 = در حال آماده‌سازی، 3 = آماده شد، 4 = لغو شد */
export const ORDER_STATUS = { created: 1, preparing: 2, ready: 3, cancelled: 4 } as const;

/** id-e sabad ra az javab-e AddBasket dar miyavarad (shekl-e daghigh-e javab moshakhas nist) */
export function extractBasketId(res: any): string | null {
  const root = res?.result ?? res?.data ?? res?.value ?? res;
  if (typeof root === 'string') return root;
  const id = root?.id ?? root?.basketId ?? res?.id ?? res?.basketId;
  return typeof id === 'string' ? id : null;
}

@Injectable({ providedIn: 'root' })
export class BasketApiService {
  private readonly http = inject(HttpClient);

  /** POST /api/Basket/AddBasket */
  addBasket(body: AddBasketRequest): Observable<any> {
    return this.http.post<any>(`${API_BASE}/api/Basket/AddBasket`, body);
  }

  /** GET /api/Basket/GetBasketById?id=... — baraye peygiri-ye vaziat-e sefaresh */
  getBasketById(id: string): Observable<any> {
    return this.http.get<any>(`${API_BASE}/api/Basket/GetBasketById`, { params: { id } });
  }
}
