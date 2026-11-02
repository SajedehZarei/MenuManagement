import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, expand, map, reduce } from 'rxjs';
import type { StickerName } from '../ui/sticker';
import type { Category, MenuItem } from '../menu-data';
import { API_BASE } from './api.config';

type Raw = Record<string, any>;

/** Shape of GET /api/Menu/GetMenu: { statusCode, message, total, page, perPage, result: [...] } */
interface MenuResponse {
  perPage?: number;
  result?: Raw[];
}

export interface MenuData {
  categories: Category[];
  items: MenuItem[];
}

const ICONS: StickerName[] = ['cup', 'iced', 'toast', 'cheesecake', 'teapot', 'mug', 'bowl', 'croissant'];
const PER_PAGE = 100;
const MAX_PAGES = 50;

function imageUrl(raw: Raw): string | undefined {
  const p = raw['imageUrl'] ?? raw['image'] ?? raw['imagePath'] ?? raw['photo'];
  if (!p || typeof p !== 'string') return undefined;
  if (/^(https?:|data:)/i.test(p)) return p;
  return `${API_BASE}/${p.replace(/^\/+/, '')}`;
}

@Injectable({ providedIn: 'root' })
export class MenuApiService {
  private readonly http = inject(HttpClient);

  /** Loads every page of GET /api/Menu/GetMenu and builds categories from the items. */
  getMenu(): Observable<MenuData> {
    const seen = new Set<string>();
    const fetchPage = (page: number) =>
      this.http.get<MenuResponse>(`${API_BASE}/api/Menu/GetMenu`, { params: { page, perPage: PER_PAGE } });

    return fetchPage(1).pipe(
      expand((res, i) => {
        const list = res.result ?? [];
        const fresh = list.filter((r) => !seen.has(r['id']));
        list.forEach((r) => seen.add(r['id']));
        const pageSize = Number(res.perPage) || list.length;
        // stop when the page is short, empty, or the server ignores `page` (nothing new)
        return fresh.length > 0 && list.length >= pageSize && i < MAX_PAGES ? fetchPage(i + 2) : EMPTY;
      }),
      reduce((all, res) => all.concat(res.result ?? []), [] as Raw[]),
      map((raws) => this.build(raws)),
    );
  }

  private build(raws: Raw[]): MenuData {
    const categories: Category[] = [];
    const items: MenuItem[] = [];
    const ids = new Set<string>();

    for (const r of raws) {
      if (r['isDeleted'] || ids.has(r['id'])) continue;
      ids.add(r['id']);

      const catId = String(r['categoryId'] ?? r['category']?.['id']);
      let cat = categories.find((c) => c.id === catId);
      if (!cat) {
        cat = {
          id: catId,
          title: r['category']?.['title'] ?? 'سایر',
          icon: ICONS[categories.length % ICONS.length],
          image: imageUrl(r['category'] ?? {}),
        };
        categories.push(cat);
      }

      items.push({
        id: String(r['id']),
        category: catId,
        title: r['title'] ?? '',
        description: r['description'] ?? '',
        price: Number(r['price'] ?? 0),
        icon: cat.icon,
        image: imageUrl(r),
        badge: r['isNew'] ? 'جدید' : r['isPopular'] ? 'محبوب' : r['isRecommended'] ? 'پیشنهاد سرآشپز' : undefined,
      });
    }
    return { categories, items };
  }
}
