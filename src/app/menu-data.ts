import type { StickerName } from './ui/sticker';

export type CategoryId = 'hot' | 'cold' | 'breakfast' | 'dessert' | 'other';

export interface Category {
  id: CategoryId | 'all';
  title: string;
  icon: StickerName;
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

export const CATEGORIES: Category[] = [
  { id: 'all', title: 'همه', icon: 'leaf' },
  { id: 'hot', title: 'قهوه گرم', icon: 'cup' },
  { id: 'cold', title: 'قهوه سرد', icon: 'iced' },
  { id: 'breakfast', title: 'صبحانه و ساندویچ', icon: 'toast' },
  { id: 'dessert', title: 'دسر و کیک', icon: 'cheesecake' },
  { id: 'other', title: 'چای و نوشیدنی', icon: 'teapot' },
];

export const MENU_ITEMS: MenuItem[] = [
  // قهوه گرم
  {
    id: 'espresso', category: 'hot', title: 'اسپرسو', description: 'شات غلیظ و معطر از دانه‌های برشته‌ی تازه', price: 85000, icon: 'cup',
    options: [
      { id: 'single', label: 'تک', price: 85000 },
      { id: 'double', label: 'دبل', price: 105000 },
    ],
  },
  { id: 'americano', category: 'hot', title: 'آمریکانو', description: 'اسپرسوی دوبل با آب داغ، سبک و ملایم', price: 95000, icon: 'cup' },
  { id: 'cappuccino', category: 'hot', title: 'کاپوچینو', description: 'اسپرسو، شیر بخارداده و فوم ابریشمی', price: 125000, icon: 'cappuccino', badge: 'محبوب' },
  { id: 'latte', category: 'hot', title: 'لاته', description: 'قهوه‌ی نرم با شیر و لایه‌ی نازک فوم', price: 135000, icon: 'latte' },
  { id: 'flatwhite', category: 'hot', title: 'فلت وایت', description: 'اسپرسوی ریسترتو با شیر مخملی', price: 140000, icon: 'cappuccino' },
  { id: 'mocha', category: 'hot', title: 'موکا', description: 'ترکیب قهوه، شکلات تلخ و شیر', price: 150000, icon: 'mug' },
  { id: 'cortado', category: 'hot', title: 'کورتادو', description: 'اسپرسو با کمی شیر گرم، متعادل و پرطعم', price: 130000, icon: 'cup', badge: 'جدید' },
  { id: 'turkish-coffee', category: 'hot', title: 'قهوه ترک', description: 'دم‌آوری سنتی به سبک ترک، غلیظ و معطر', price: 100000, icon: 'cup', badge: 'جدید' },
  { id: 'drip-coffee', category: 'hot', title: 'قهوه دمی', description: 'قهوه‌ی فیلتری ملایم و تمیز', price: 110000, icon: 'mug', badge: 'جدید' },

  // قهوه سرد
  { id: 'icelatte', category: 'cold', title: 'آیس لاته', description: 'اسپرسو، شیر سرد و یخ فراوان', price: 145000, icon: 'iced', badge: 'محبوب' },
  { id: 'iceamericano', category: 'cold', title: 'آیس آمریکانو', description: 'تازه، سبک و خنک برای روزهای گرم', price: 105000, icon: 'iced' },
  { id: 'coldbrew', category: 'cold', title: 'کلد برو', description: 'دمای سرد و ۱۸ ساعت دم‌آوری آرام', price: 155000, icon: 'iced', badge: 'جدید' },
  { id: 'iced-mocha', category: 'cold', title: 'آیس موکا', description: 'اسپرسو، شیر سرد، سس شکلات و یخ', price: 150000, icon: 'iced', badge: 'جدید' },
  { id: 'iced-caramel', category: 'cold', title: 'آیس کارامل', description: 'اسپرسو، شیر سرد، سس کارامل و یخ', price: 155000, icon: 'iced' },
  { id: 'iced-chocolate', category: 'cold', title: 'آیس چاکلت', description: 'شکلات غلیظ، شیر سرد و یخ فراوان', price: 150000, icon: 'iced' },
  { id: 'frappuccino', category: 'cold', title: 'فراپوچینو', description: 'قهوه‌ی یخی بلندشده با خامه', price: 170000, icon: 'iced', badge: 'جدید' },
  { id: 'matcha-cherry', category: 'cold', title: 'ماچا چری میلک', description: 'ماچای ژاپنی، شیر سرد و سس گیلاس', price: 165000, icon: 'iced', badge: 'جدید' },
  { id: 'affogato', category: 'cold', title: 'آفوگاتو', description: 'بستنی وانیلی با شات اسپرسوی داغ', price: 140000, icon: 'affogato' },

//صبحانه و ساندویچ
  { id: 'bacon-croissant', category: 'breakfast', title: ' کروسان بیکن', description: 'کروسان کره‌ای، بیکن طلایی،دیپ ریحان و پنیر', price: 290000, icon: 'croissant' },
  { id: 'chicken-croissant', category: 'breakfast', title: 'چیکن کروسان', description: 'کروسان تازه با مرغ گریل، پنیر', price: 290000, icon: 'croissant' },
  { id: 'bacon-panini', category: 'breakfast', title: 'تست نیمرو بیکن', description: 'نان تست  گریل‌شده با پنیر ذوب‌شده، نیمرو و بیکن', price: 300000, icon: 'toast' },
  { id: 'beef-ciabatta', category: 'breakfast', title: 'ساندویچ گوشت', description: 'چاپاتا ،گوشت گریل، پنیر و سس مخصوص', price: 330000, icon: 'toast', badge: 'پیشنهاد سرآشپز' },
  { id: 'veggie-sandwich', category: 'breakfast', title: 'تست پنیر، خیار و گوجه', description:  'تست ، پنیز ، گوجه و خیار', price: 330000, icon: 'toast' },
  // دسر و کیک
  { id: 'cheesecake', category: 'dessert', title: 'چیزکیک نیویورکی', description: 'کرمی و غنی، با سس توت‌فرنگی', price: 180000, icon: 'cheesecake' },
  { id: 'napoleon', category: 'dessert', title: 'کیک ناپلئون', description: 'لایه‌های ترد و کرم پاتیسری، دستور روسی اصیل', price: 190000, icon: 'napoleon', badge: 'جدید' },
  { id: 'brownie', category: 'dessert', title: 'براونی شکلاتی', description: 'شکلات تلخ، گردو و کمی نمک دریایی', price: 160000, icon: 'brownie' },
  { id: 'croissant', category: 'dessert', title: 'کروسان کره‌ای', description: 'تازه از فر؛ ساده یا با ژامبون و پنیر', price: 120000, icon: 'croissant' },
  { id: 'tart', category: 'dessert', title: 'تارت توت', description: 'خمیر کره‌ای، کرم وانیل و توت‌های فصل', price: 175000, icon: 'tart' },

  // چای و نوشیدنی
  { id: 'samovar-tea', category: 'other', title: 'چای سماوری', description: 'چای سیاه دم‌کشیده با سماور، همراه مربا', price: 70000, icon: 'teapot', badge: 'پیشنهاد سرآشپز' },
  { id: 'masala', category: 'other', title: 'چای ماسالا', description: 'ادویه‌های گرم، شیر و کمی شیرینی', price: 105000, icon: 'cup' },
  { id: 'hot-chocolate', category: 'other', title: 'هات چاکلت', description: 'شکلات غلیظ با مارشمالو', price: 130000, icon: 'mug' },
  { id: 'iced-tea', category: 'other', title: 'آیس تی لیمو و نعناع', description: 'چای سیاه سرد با لیمو تازه و نعناع', price: 95000, icon: 'lemonade' },
  { id: 'lemonade', category: 'other', title: 'لیموناد نعناع', description: 'لیمو تازه، نعناع و آب گازدار', price: 110000, icon: 'lemonade' },
];
