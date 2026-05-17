# Installation & Setup

Get up and running with RM Angular Video Player in just a few minutes.

## Installation

Install the package via npm:

```bash
npm install @codewithrajat/rm-ng-video-player
```

## Quick Start

### 1. Import the Component

The library uses standalone components, so you don't need to import any modules. Simply import the component directly into your component's `imports` array.

```typescript
import { RmNgVideoPlayerComponent } from '@codewithrajat/rm-ng-video-player';

@Component({
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  // ...
})
export class MyComponent {}
```

### 2. Basic Usage

Add the player to your template and provide the necessary inputs.

```html
<rm-ng-video-player
  [videoSources]="videoSources"
  [videoConfig]="videoConfig"
  (playerEvent)="onPlayerEvent($event)">
</rm-ng-video-player>
```

### 3. Basic Configuration

```typescript
import { VideoSource, VideoPlayerConfig } from '@codewithrajat/rm-ng-video-player';

// ... inside your component
protected readonly videoSources: VideoSource[] = [
  {
    url: 'https://example.com/video.mp4',
    type: 'video/mp4',
    label: 'HD',
  }
];

protected readonly videoConfig: VideoPlayerConfig = {
  autoplay: false,
  muted: false,
  poster: 'assets/poster.jpg'
};

onPlayerEvent(event: any) {
  console.log('Player event:', event.type);
}
```

## Developer Setup (Contributing)

If you want to contribute to the library or run it locally for development:

```bash
# Clone the repository
git clone https://github.com/malikrajat/rm-ng-video-player-main.git

# Install dependencies
pnpm install

# Start the demo application
npm run start

# Build the library
npm run build:lib
```
