import type { StickerName } from './ui/sticker';

export type CategoryId = string;

export interface Category {
  id: CategoryId | 'all';
  title: string;
  icon: StickerName;
  image?: string;
}

export interface MenuOption {
  id: string;
  label: string;
  price: number; // تومان
}

export interface MenuItem {
  id: string;
  category: CategoryId;
  title: string;
  description: string;
  price: number; // تومان
  icon: StickerName;
  /** optional photo path inside /public (default: menu/<id>.webp) */
  image?: string;
  badge?: 'جدید' | 'محبوب' | 'پیشنهاد سرآشپز';
  /** optional variants (e.g. single / double). The first one is the default. */
  options?: MenuOption[];
}

/** The "all" tab. Real categories and items come from the backend (see MenuStore). */
export const ALL_CATEGORY: Category = { id: 'all', title: 'همه', icon: 'leaf' };
