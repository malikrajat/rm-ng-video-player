# Restricted Learning Example (LMS)

Enforce viewing rules by preventing users from skipping ahead in educational content until they've watched it.

## Use Case
You are building an LMS or training portal where compliance requires users to watch the entire lesson. You want to allow them to re-watch previously seen parts, but "lock" the future parts.

## Problem Solved
"How do I ensure students watch the entire video before taking a quiz?"

## Component Code

```typescript
import { Component, signal } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-restricted-lms',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player 
      [videoSources]="sources" 
      (playerEvent)="handleEvent($event)">
    </rm-ng-video-player>
    <p>Max Watched: {{maxWatched()}}s</p>
  `
})
export class RestrictedLmsComponent {
  public maxWatched = signal(0);
  private isEnforcing = false;

  handleEvent(event: VideoPlayerEvent) {
    if (event.type === 'timeupdate') {
      if (event.data > this.maxWatched()) {
        this.maxWatched.set(event.data);
      }
    }
    
    // Logic to detect skipping ahead
    if (event.type === 'seeking' && event.data > this.maxWatched()) {
       // logic to snap back
    }
  }
}
```

## Key Benefits
- **Compliance Integration**: Link `maxWatched` to your database.
- **User Flexibility**: Allows skipping back to review materials, but blocks skipping forward.
- **Accurate Tracking**: Uses high-frequency `timeupdate` pulses.
