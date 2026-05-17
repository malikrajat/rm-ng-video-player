# Streaming Experience Example

Create a high-end streaming experience with subtitles and automatic transitions between video content.

## Use Case
You are building an OTT (Over-the-top) streaming platform or a course player where sequential viewing and multilingual support are critical.

## Features Demonstrated
- **Subtitles/Captions**: Integration of multiple WebVTT tracks.
- **Auto-Next**: Handling the `ended` event to move to the next episode/lesson.
- **Customized Delay**: Controlling how fast UI elements disappear.

## Component Code

```typescript
import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-streaming-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player 
      [videoSources]="currentEpisode.sources" 
      [videoConfig]="config"
      (playerEvent)="handleEvent($event)">
    </rm-ng-video-player>
  `
})
export class StreamingPlayerComponent {
  // Current playback state
  
  handleEvent(event: VideoPlayerEvent) {
    if (event.type === 'ended') {
      this.playNextEpisode();
    }
  }
}
```
