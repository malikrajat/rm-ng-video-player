# API Reference

Comprehensive documentation of all components, interfaces, and events available in the RM Angular Video Player.

## RmNgVideoPlayerComponent

The main component for the video player.

### Inputs

| Property | Type | Description |
| --- | --- | --- |
| `videoSources` | `VideoSource[]` | Array of video sources (URL, type, label). |
| `videoConfig` | `VideoPlayerConfig` | Configuration object for player behavior and UI. |

### Outputs

| Event | Type | Description |
| --- | --- | --- |
| `playerEvent` | `EventEmitter<VideoPlayerEvent>` | Emitted for various player actions and state changes. |

## Interfaces

### VideoPlayerConfig

Detailed configuration options:

```typescript
interface VideoPlayerConfig {
  // Playback Settings
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  replayOnEnd?: boolean;
  playsinline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';

  // UI Settings
  showControls?: boolean;
  showFullscreenButton?: boolean;
  showVolumeButton?: boolean;
  showProgressBar?: boolean;
  showRetryButton?: boolean;
  hideControlsDelay?: number;

  // Interaction
  seekStep?: number;
  volumeStep?: number;

  // Media
  poster?: string;
  tracks?: VideoTrack[];
}
```

### VideoSource

```typescript
interface VideoSource {
  url: string;
  type: string;
  label?: string; // e.g., '1080p', '4K'
}
```

### VideoTrack

```typescript
interface VideoTrack {
  src: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  srclang: string;
  label: string;
  default?: boolean;
}
```

## Event Types

The `playerEvent` output emits objects of type `VideoPlayerEvent`.

| Type | Data Description |
| --- | --- |
| `play` | Video started playing. |
| `pause` | Video paused. |
| `ended` | Video reached the end. |
| `timeupdate` | Current playback time changed (data: `currentTime`). |
| `volumechange` | Volume adjusted (data: `volume`). |
| `fullscreenchange` | Fullscreen mode toggled (data: `isFullscreen`). |
| `error` | An error occurred during playback. |
