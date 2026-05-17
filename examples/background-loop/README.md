# Cinematic Background Loop Example

Learn how to use the player as a high-performance, cinematic background for your website headers or hero sections.

## Use Case
You want a silent, auto-playing video background that spans the entire width of the screen, without showing any player controls, icons, or progress bars.

## Problem Solved
"How do I make a video background that doesn't look like a media player?"

## Component Code

```typescript
import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerConfig } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-hero-background',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <div class="hero-section">
      <rm-ng-video-player 
        class="bg-player"
        [videoSources]="sources" 
        [videoConfig]="config">
      </rm-ng-video-player>
      
      <div class="hero-content">
        <h1>Experience the Future</h1>
        <button>Get Started</button>
      </div>
    </div>
  `,
  styles: [`
    .hero-section { position: relative; height: 100vh; overflow: hidden; }
    .bg-player { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
    .hero-content { position: relative; z-index: 10; color: white; text-align: center; top: 50%; transform: translateY(-50%); }
  `]
})
export class HeroBackgroundComponent {
  protected readonly sources: VideoSource[] = [
    { url: 'assets/cinematic-loop.mp4', type: 'video/mp4' }
  ];

  protected readonly config: VideoPlayerConfig = {
    autoplay: true,
    muted: true,
    loop: true,
    showControls: false, // Essential for background videos
    preload: 'auto',
    playsinline: true
  };
}
```

## Tips for Video backgrounds
- **Keep it small**: Use highly compressed videos to save bandwidth.
- **Mute it**: Browsers will not autoplay background videos if they are not muted.
- **Looping**: Set `loop: true` for a seamless infinite background.
