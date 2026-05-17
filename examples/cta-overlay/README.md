# CTA & Ads Overlay Example

Maximize engagement by triggering call-to-action buttons or promotional overlays at precise moments during video playback.

## Use Case
You are showing a promo video for a product and want a "Buy Now" button to appear exactly when the feature is shown on screen.

## Problem Solved
"How do I show a 'Buy Now' button at exactly 02:30 in my promo video?"

## Component Code

```typescript
import { Component, signal } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-cta-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <div class="player-stack">
       <rm-ng-video-player (playerEvent)="onTimeUpdate($event)"></rm-ng-video-player>
       
       <!-- Overlay triggered at 15s -->
       @if (showCTA()) {
         <div class="cta-overlay floating">
           <p>Don't miss out! Special offer ending soon.</p>
           <button (click)="buyNow()">Claim 50% Off</button>
         </div>
       }
    </div>
  `
})
export class CtaPlayerComponent {
  public showCTA = signal(false);

  onTimeUpdate(event: VideoPlayerEvent) {
    if (event.type === 'timeupdate') {
      // Trigger CTA at 15 seconds
      this.showCTA.set(event.data > 15 && event.data < 25);
    }
  }
}
```

## Why this is better than baked-in ads
- **Interactive**: Users can click the button directly in the web app.
- **Dynamic**: You can change the discount code or CTA text without re-rendering the video.
- **SEO Friendly**: Overlay text is part of your DOM, making it searchable.
