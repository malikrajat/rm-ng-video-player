# Event Handling & State Example

Connect the video player's internal state to your application's logic using a powerful event system.

## Use Case
You need to track user engagement, save "Watch Later" positions, or trigger application-level UI changes (like hiding a sidebar) during playback.

## Features Demonstrated
- **Real-time Synchronization**: Using `timeupdate` to track progress.
- **Engagement Analytics**: Capturing `play` and `pause` events.
- **Dynamic UI**: Responding to `fullscreenchange` to adjust page layout.

## Component Code

```typescript
import { Component, signal } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-analytics-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player (playerEvent)="onEvent($event)"></rm-ng-video-player>
    <div class="dashboard">
      <span>Playback Time: {{currentTime()}}s</span>
    </div>
  `
})
export class AnalyticsPlayerComponent {
  public currentTime = signal(0);

  onEvent(event: VideoPlayerEvent) {
    if (event.type === 'timeupdate') {
      this.currentTime.set(event.data);
    }
  }
}
```
