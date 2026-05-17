# Basic Usage Example

The most straightforward way to get the player running in your Angular application.

## Use Case
You just want to play a single video with default settings and no complex configuration.

## Component Code

```typescript
import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-basic-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player [videoSources]="sources"></rm-ng-video-player>
  `
})
export class BasicPlayerComponent {
  protected readonly sources: VideoSource[] = [
    {
      url: 'https://example.com/simple-video.mp4',
      type: 'video/mp4'
    }
  ];
}
```

## Key Points
- **Minimal Props**: Only `[videoSources]` is strictly required.
- **Default Experience**: Full controls, volume, and playback features are enabled by default.
- **Standalone Ready**: No module setup needed.
