---
name: lucide-icons
description: Project icon rule. Every icon in any UI, page, artifact, mockup, or component built in this project comes from Lucide (lucide.dev). Use whenever you are about to draw, pick, or embed an icon, and never substitute emoji, hand-drawn SVG, Font Awesome, Material Icons, or Heroicons.
---

# Lucide Icons

This project uses **Lucide** (https://lucide.dev) for every icon. No other icon set, no emoji as icons, no hand-authored SVG glyphs.

## Picking an icon

- Browse names at https://lucide.dev/icons. Names are kebab-case (`chevron-right`, `message-circle`, `book-open`, `bell`, `calendar-heart`).
- Prefer the plainest icon that carries the meaning. Lucide's strength is quiet, consistent strokes; a decorative variant fights that.
- One metaphor per concept across the whole product. If "reminder" is `bell` on one screen, it is `bell` everywhere.
- Decorative section markers do not get icons. Icons mark actions, states, and object types.

## Sizing and stroke

Lucide is drawn on a 24px grid with a 2px stroke. Keep the ratio when scaling.

| Use | Size | Stroke width |
| --- | --- | --- |
| Inline with body text, list markers | 16px | 2 |
| Buttons, nav, form controls | 20px | 2 |
| Default standalone | 24px | 2 |
| Feature / empty-state illustration | 32–48px | 1.5 |

- Color icons with `currentColor` so they follow the text color and both themes.
- Align an inline icon to the text with `vertical-align: -0.125em` or flex `align-items: center`.
- Give icon-only buttons an `aria-label`. Decorative icons next to a label get `aria-hidden="true"`.

## Plain HTML and artifacts

Load the UMD build from cdnjs, pinned to an exact version, before the inline script that calls it. Then place `<i data-lucide="...">` elements and call `lucide.createIcons()` once the DOM is ready.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/1.45.0/umd/lucide.min.js"></script>

<button type="button" class="btn">
  <i data-lucide="gift" aria-hidden="true"></i>
  부모님께 선물하기
</button>

<script>
  lucide.createIcons({ attrs: { 'stroke-width': 2, width: 20, height: 20 } });
</script>
```

Notes for the Artifact sandbox: only cdnjs and jsdelivr scripts are allowed, so use the `<script>` tag above rather than an ES module import. If the CDN cannot be used, paste the SVG for the specific icons from lucide.dev (the copy button gives clean `<svg>` markup) and keep `stroke="currentColor"`.

## React

```bash
npm install lucide-react
```

```tsx
import { Gift, Bell, BookOpen } from 'lucide-react';

<Button><Gift size={20} aria-hidden /> 부모님께 선물하기</Button>
<Bell size={16} strokeWidth={2} />
<BookOpen size={40} strokeWidth={1.5} />
```

Import icons individually so the bundle only carries what is used.

## Vue, Svelte, others

Use the official packages: `lucide-vue-next`, `lucide-svelte`, `lucide-solid`, `lucide-angular`, `@lucide/lab` for experimental glyphs. Same names, same props.

## Checklist before shipping a screen

- Every icon is a Lucide name that exists on lucide.dev.
- Size and stroke follow the table above; nothing is scaled to an odd pixel size.
- Color is `currentColor`, never a hard-coded hex.
- Same concept, same icon, everywhere.
- Icon-only controls have an accessible name.
