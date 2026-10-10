import { Component, input } from '@angular/core';

export type StickerName =
  | 'cup' | 'cappuccino' | 'mug' | 'latte' | 'iced' | 'affogato'
  | 'toast' | 'bowl' | 'omelette' | 'pancakes'
  | 'cheesecake' | 'napoleon' | 'brownie' | 'croissant' | 'tart'
  | 'teapot' | 'lemonade' | 'bean' | 'leaf';

/** Hand-drawn style SVG stickers (white outline + soft shadow). Needs the #sticker filter from app.html. */
@Component({
  selector: 'app-sticker',
  host: { class: 'inline-block' },
  template: `
    <svg viewBox="0 0 100 100" class="size-full overflow-visible" aria-hidden="true">
      <g filter="url(#sticker)" stroke="#552a12" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">
        @switch (name()) {
          @case ('cup') {
            <path d="M40 32 q-5 -5 0 -10 t0 -10 M54 32 q-5 -5 0 -10 t0 -10" fill="none" stroke="#8a845a"/>
            <ellipse cx="50" cy="80" rx="34" ry="7" fill="#e2d6c1"/>
            <path d="M70 48 H76 A8 8 0 0 1 76 64 H69" fill="none"/>
            <path d="M26 42 H70 V56 Q70 76 48 76 Q26 76 26 56 Z" fill="#f7eedc"/>
            <ellipse cx="48" cy="42" rx="22" ry="5" fill="#7a4426"/>
          }
          @case ('cappuccino') {
            <path d="M40 32 q-5 -5 0 -10 t0 -10 M54 32 q-5 -5 0 -10 t0 -10" fill="none" stroke="#8a845a"/>
            <ellipse cx="50" cy="80" rx="34" ry="7" fill="#e2d6c1"/>
            <path d="M70 48 H76 A8 8 0 0 1 76 64 H69" fill="none"/>
            <path d="M26 42 H70 V56 Q70 76 48 76 Q26 76 26 56 Z" fill="#f7eedc"/>
            <ellipse cx="48" cy="42" rx="22" ry="5" fill="#d9b48f"/>
            <path d="M48 46 C41 42 42 38 45 38 C47 38 48 39.5 48 39.5 C48 39.5 49 38 51 38 C54 38 55 42 48 46Z" fill="#f7eedc" stroke="none"/>
          }
          @case ('mug') {
            <path d="M36 30 q-4 -5 0 -9 M48 30 q-4 -5 0 -9" fill="none" stroke="#8a845a"/>
            <path d="M66 44 H72 A9 9 0 0 1 72 62 H65" fill="none"/>
            <path d="M24 38 H66 V68 Q66 80 54 80 H36 Q24 80 24 68 Z" fill="#a7a577"/>
            <ellipse cx="45" cy="38" rx="21" ry="5" fill="#6b3a1e"/>
            <rect x="33" y="30" width="9" height="8" rx="3" fill="#fffaf0"/>
            <rect x="46" y="29" width="9" height="8" rx="3" fill="#fffaf0"/>
            <path d="M32 54 q6 -5 12 0 t12 0" fill="none" stroke="#f7eedc"/>
          }
          @case ('latte') {
            <polygon points="32,24 68,24 66.3,44 33.7,44" fill="#f7eedc" stroke="none"/>
            <polygon points="33.7,44 66.3,44 64.7,62 35.3,62" fill="#d9b48f" stroke="none"/>
            <polygon points="35.3,62 64.7,62 63,82 37,82" fill="#7a4426" stroke="none"/>
            <path d="M32 24 H68 L63 82 H37 Z" fill="none"/>
            <path d="M58 24 L66 6" stroke="#8a845a" stroke-width="4.5" fill="none"/>
          }
          @case ('iced') {
            <path d="M58 30 L65 8" stroke="#6b663f" stroke-width="5" fill="none"/>
            <polygon points="30,30 70,30 68.3,48 31.7,48" fill="#f7eedc" stroke="none"/>
            <polygon points="31.7,48 68.3,48 66.7,66 33.3,66" fill="#d9b48f" stroke="none"/>
            <polygon points="33.3,66 66.7,66 65,84 64,88 36,88 35,84" fill="#7a4426" stroke="none"/>
            <path d="M30 30 H70 L65 84 Q64 88 60 88 H40 Q36 88 35 84 Z" fill="none"/>
            <rect x="33" y="34" width="13" height="13" rx="3" fill="#fffaf0" fill-opacity="0.75" transform="rotate(-12 40 40)"/>
            <rect x="49" y="36" width="12" height="12" rx="3" fill="#fffaf0" fill-opacity="0.75" transform="rotate(10 55 42)"/>
            <rect x="27" y="22" width="46" height="9" rx="4.5" fill="#f7eedc"/>
            <ellipse cx="50" cy="66" rx="5" ry="7.5" fill="#f7eedc" stroke-width="1.6" transform="rotate(25 50 66)"/>
          }
          @case ('affogato') {
            <rect x="46" y="68" width="8" height="14" fill="#e2d6c1"/>
            <ellipse cx="50" cy="85" rx="20" ry="5" fill="#e2d6c1"/>
            <circle cx="50" cy="42" r="18" fill="#fffaf0"/>
            <path d="M33 38 Q50 22 67 38 Q63 50 58 43 Q53 56 48 45 Q41 52 33 38Z" fill="#7a4426"/>
            <path d="M22 50 H78 Q78 72 50 72 Q22 72 22 50Z" fill="#f7eedc"/>
          }
          @case ('toast') {
            <path d="M18 36 Q18 22 34 22 H66 Q82 22 82 36 Q82 42 78 44 V76 Q78 84 70 84 H30 Q22 84 22 76 V44 Q18 42 18 36Z" fill="#d9a15a"/>
            <rect x="29" y="34" width="42" height="40" rx="8" fill="#f2d39c" stroke="none"/>
            <path d="M32 58 Q40 48 52 54 Q64 50 68 60 Q62 70 50 68 Q38 70 32 58Z" fill="#9bbb62"/>
            <ellipse cx="52" cy="46" rx="14" ry="10" fill="#fffaf0"/>
            <circle cx="50" cy="45" r="5" fill="#f2b84b" stroke-width="1.6"/>
            <path d="M60 66 q4 -4 8 0" fill="none" stroke="#6b663f" stroke-width="2"/>
          }
          @case ('bowl') {
            <path d="M20 48 H80 Q80 80 50 80 Q20 80 20 48Z" fill="#e8dcc8"/>
            <path d="M24 60 H76" fill="none" stroke="#8a845a"/>
            <ellipse cx="50" cy="48" rx="30" ry="8" fill="#f3e6cf"/>
            <circle cx="40" cy="44" r="5.5" fill="#c0392b" stroke-width="1.8"/>
            <circle cx="56" cy="42" r="5.5" fill="#4a5a8c" stroke-width="1.8"/>
            <circle cx="64" cy="49" r="4.5" fill="#c0392b" stroke-width="1.8"/>
            <circle cx="47" cy="50" r="4.5" fill="#4a5a8c" stroke-width="1.8"/>
            <path d="M48 38 q6 -10 14 -6 q-4 8 -14 6Z" fill="#8fae5a" stroke-width="1.8"/>
          }
          @case ('omelette') {
            <circle cx="50" cy="54" r="36" fill="#f7eedc"/>
            <circle cx="50" cy="54" r="28" fill="none" stroke="#d3c4a9" stroke-width="1.6"/>
            <path d="M24 58 Q24 36 50 36 Q76 36 76 58 Q50 66 24 58Z" fill="#f2c75c"/>
            <ellipse cx="40" cy="48" rx="4" ry="2.6" fill="#8fae5a" stroke-width="1.4"/>
            <ellipse cx="54" cy="46" rx="4" ry="2.6" fill="#8fae5a" stroke-width="1.4" transform="rotate(20 54 46)"/>
            <ellipse cx="64" cy="53" rx="3.6" ry="2.4" fill="#8fae5a" stroke-width="1.4"/>
            <path d="M44 72 q4 -8 10 -4 q-2 8 -10 4Z" fill="#6b663f" stroke-width="1.6"/>
          }
          @case ('pancakes') {
            <ellipse cx="50" cy="80" rx="36" ry="8" fill="#e2d6c1"/>
            <rect x="24" y="58" width="52" height="15" rx="7.5" fill="#e5b772"/>
            <rect x="26" y="45" width="48" height="15" rx="7.5" fill="#edc687"/>
            <rect x="28" y="32" width="44" height="15" rx="7.5" fill="#e5b772"/>
            <path d="M34 32 Q36 24 50 24 Q64 24 66 32 Q58 36 50 34 Q42 36 34 32Z" fill="#fffaf0"/>
            <circle cx="50" cy="22" r="6" fill="#c0392b" stroke-width="1.8"/>
            <path d="M56 20 q6 -8 12 -4 q-4 8 -12 4Z" fill="#8fae5a" stroke-width="1.6"/>
            <path d="M36 47 q2 8 4 0 M60 60 q2 8 4 0" fill="none" stroke="#b8453a" stroke-width="2.4"/>
          }
          @case ('cheesecake') {
            <ellipse cx="50" cy="82" rx="36" ry="6" fill="#e2d6c1"/>
            <path d="M20 62 H80 V74 Q80 78 76 78 H24 Q20 78 20 74 Z" fill="#b07a4a"/>
            <path d="M20 62 V48 Q20 44 24 43 L76 36 Q80 36 80 40 V62 Z" fill="#f6e4b8"/>
            <path d="M22 46 L78 38 V44 Q70 50 64 44 Q58 54 52 44 Q44 52 38 44 Q30 52 22 46Z" fill="#d9503f" stroke-width="1.8"/>
            <circle cx="42" cy="32" r="6.5" fill="#c0392b" stroke-width="1.8"/>
            <circle cx="56" cy="31" r="5.5" fill="#4a5a8c" stroke-width="1.8"/>
            <path d="M60 28 q6 -9 13 -5 q-4 9 -13 5Z" fill="#8fae5a" stroke-width="1.6"/>
          }
          @case ('napoleon') {
            <ellipse cx="52" cy="84" rx="38" ry="6" fill="#e2d6c1"/>
            <path d="M72 46 L88 34 V66 L72 78 Z" fill="#c98f52"/>
            <path d="M20 46 H72 V78 H20 Z" fill="#e5b772"/>
            <rect x="20" y="53" width="52" height="5" fill="#f6e4b8" stroke="none"/>
            <rect x="20" y="62" width="52" height="5" fill="#f6e4b8" stroke="none"/>
            <rect x="20" y="71" width="52" height="5" fill="#f6e4b8" stroke="none"/>
            <path d="M20 46 H72 V78 H20 Z" fill="none"/>
            <path d="M20 46 L36 34 H88 L72 46 Z" fill="#edc687"/>
            <circle cx="44" cy="40" r="1.8" fill="#c98f52" stroke="none"/>
            <circle cx="58" cy="39" r="1.8" fill="#c98f52" stroke="none"/>
            <circle cx="70" cy="40" r="1.8" fill="#c98f52" stroke="none"/>
            <circle cx="52" cy="42" r="1.5" fill="#c98f52" stroke="none"/>
          }
          @case ('brownie') {
            <ellipse cx="52" cy="84" rx="38" ry="6" fill="#e2d6c1"/>
            <path d="M72 46 L88 34 V66 L72 78 Z" fill="#3b1f0e"/>
            <path d="M20 46 H72 V78 H20 Z" fill="#552a12"/>
            <rect x="20" y="58" width="52" height="5" fill="#8a5a3b" stroke="none"/>
            <path d="M20 46 H72 V78 H20 Z" fill="none"/>
            <path d="M20 46 L36 34 H88 L72 46 Z" fill="#6b3a1e"/>
            <circle cx="46" cy="40" r="4.5" fill="#d9b48f" stroke-width="1.6"/>
            <circle cx="64" cy="40" r="4.5" fill="#d9b48f" stroke-width="1.6"/>
            <path d="M30 56 q8 8 14 0" fill="none" stroke="#fffaf0" stroke-width="1.8"/>
          }
          @case ('croissant') {
            <path d="M10 66 C10 40 30 26 50 26 C70 26 90 40 90 66 C84 68 78 64 76 58 C70 64 62 64 58 58 C54 64 46 64 42 58 C38 64 30 64 24 58 C22 64 16 68 10 66Z" fill="#e0a35a"/>
            <path d="M36 30 Q40 44 42 58 M50 26 V58 M64 30 Q60 44 58 58 M22 40 Q26 50 24 58 M78 40 Q74 50 76 58" fill="none"/>
            <path d="M32 36 q4 -4 9 -5 M56 31 q5 1 9 5" fill="none" stroke="#f3c985" stroke-width="2.6"/>
          }
          @case ('tart') {
            <ellipse cx="50" cy="82" rx="36" ry="6" fill="#e2d6c1"/>
            <path d="M16 56 H84 L77 80 H23 Z" fill="#e0b070"/>
            <path d="M28 64 L30 78 M40 64 L41 79 M50 64 V79 M60 64 L59 79 M72 64 L70 78" fill="none" stroke-width="1.8"/>
            <ellipse cx="50" cy="56" rx="34" ry="9" fill="#f6e4b8"/>
            <circle cx="38" cy="50" r="6.5" fill="#c0392b" stroke-width="1.8"/>
            <circle cx="52" cy="47" r="6.5" fill="#4a5a8c" stroke-width="1.8"/>
            <circle cx="64" cy="53" r="5.5" fill="#c0392b" stroke-width="1.8"/>
            <circle cx="47" cy="57" r="5" fill="#4a5a8c" stroke-width="1.8"/>
            <path d="M52 40 q6 -9 13 -5 q-4 9 -13 5Z" fill="#8fae5a" stroke-width="1.6"/>
          }
          @case ('teapot') {
            <path d="M42 28 q-4 -5 0 -10 M54 28 q-4 -5 0 -10" fill="none" stroke="#8a845a"/>
            <path d="M26 50 Q8 48 12 62 Q16 74 29 68" fill="none"/>
            <path d="M73 52 Q88 48 90 32 L83 31 Q82 42 72 44" fill="#8a845a"/>
            <path d="M26 56 Q26 36 50 36 Q74 36 74 56 Q74 78 50 78 Q26 78 26 56Z" fill="#a7a577"/>
            <path d="M32 60 Q50 70 68 60" fill="none" stroke="#f7eedc"/>
            <ellipse cx="50" cy="35" rx="13" ry="4" fill="#8a845a"/>
            <circle cx="50" cy="30" r="3.5" fill="#f7eedc"/>
            <rect x="34" y="78" width="32" height="5" rx="2.5" fill="#6b663f"/>
          }
          @case ('lemonade') {
            <polygon points="30,26 70,26 67.8,52 32.2,52" fill="#fbeaa0" stroke="none"/>
            <polygon points="32.2,52 67.8,52 65.5,84 34.5,84" fill="#f4d94e" stroke="none"/>
            <path d="M30 26 H70 L65.5 84 Q65 88 61 88 H39 Q35 88 34.5 84 Z" fill="none"/>
            <rect x="37" y="36" width="12" height="12" rx="3" fill="#fffaf0" fill-opacity="0.75" transform="rotate(-10 43 42)"/>
            <rect x="50" y="52" width="12" height="12" rx="3" fill="#fffaf0" fill-opacity="0.6" transform="rotate(14 56 58)"/>
            <path d="M42 26 L36 6" stroke="#c0392b" stroke-width="4.5" fill="none"/>
            <ellipse cx="46" cy="22" rx="6" ry="3.5" fill="#8fae5a" stroke-width="1.8" transform="rotate(-30 46 22)"/>
            <ellipse cx="55" cy="20" rx="6" ry="3.5" fill="#6b663f" stroke-width="1.8" transform="rotate(25 55 20)"/>
            <circle cx="72" cy="30" r="14" fill="#f2d34d"/>
            <circle cx="72" cy="30" r="10" fill="#fbeaa0" stroke-width="1.6"/>
            <path d="M72 20 V40 M62 30 H82 M65 23 L79 37 M79 23 L65 37" fill="none" stroke="#f2d34d" stroke-width="1.6"/>
          }
          @case ('bean') {
            <g transform="rotate(30 50 50)">
              <ellipse cx="50" cy="50" rx="21" ry="30" fill="#7a4426"/>
              <path d="M50 22 Q38 40 50 50 Q62 60 50 78" fill="none" stroke="#3b1f0e" stroke-width="3"/>
              <path d="M38 34 q2 -6 7 -9" fill="none" stroke="#b5815a" stroke-width="2.4"/>
            </g>
          }
          @case ('leaf') {
            <path d="M22 80 C12 44 40 16 80 20 C84 60 58 86 22 80 Z" fill="#8fae5a"/>
            <path d="M22 80 Q50 54 76 24" fill="none"/>
            <path d="M42 62 L36 48 M54 52 L52 38 M60 44 L70 46 M48 68 L62 66" fill="none" stroke-width="1.8"/>
          }
        }
      </g>
    </svg>
  `,
})
export class Sticker {
  readonly name = input.required<StickerName>();
}
