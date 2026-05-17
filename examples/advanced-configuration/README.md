# Advanced Configuration Example

Unlock the full potential of multi-source video playback with quality switching and rich metadata.

## Use Case
You are building a professional video platform where users expect high-quality choices (e.g., 1080p vs 4K) and a polished initial look.

## Features Demonstrated
- **Quality Switching**: Multiple sources with labels.
- **Poster Images**: Setting a preview image before playback.
- **Initial State**: Customizing autoplay and preload behavior.

## Component Code

```typescript
import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerConfig } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-advanced-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player 
      [videoSources]="sources" 
      [videoConfig]="config">
    </rm-ng-video-player>
  `
})
export class AdvancedPlayerComponent {
  protected readonly sources: VideoSource[] = [
    { url: 'video-4k.mp4', type: 'video/mp4', label: '4K Ultra HD' },
    { url: 'video-1080p.mp4', type: 'video/mp4', label: '1080p HD' },
    { url: 'video-720p.mp4', type: 'video/mp4', label: '720p' }
  ];

  protected readonly config: VideoPlayerConfig = {
    poster: 'assets/hero-poster.jpg',
    preload: 'metadata',
    showRetryButton: true,
    seekStep: 5
  };
}
```
