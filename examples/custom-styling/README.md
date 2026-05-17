# Custom Styling & Theming Example

See how easy it is to make the RM Angular Video Player your own by using CSS custom properties.

## Use Case
You have a strong brand identity and need the player to match your primary colors, border radiuses, and overall aesthetic.

## Customization Strategy
We leverage CSS Variables (Custom Properties) to ensure consistent theming without overriding complex internal CSS selectors.

## Component Code

```typescript
import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-branded-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player 
      class="brand-theme" 
      [videoSources]="sources">
    </rm-ng-video-player>
  `,
  styles: [`
    .brand-theme {
      --player-primary-color: #ff6b6b;
      --player-border-radius: 8px;
      --player-background: #1a1a1a;
      --player-blur: blur(20px);
    }
  `]
})
export class BrandedPlayerComponent {
  // ... sources
}
```
