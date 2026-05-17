# Usage Guide

Learn how to leverage the full power of RM Angular Video Player in various scenarios.

## Basic Usage

The simplest way to use the player is by providing a single video source and basic configuration.

```typescript
protected readonly videoSources = [{ url: 'path/to/video.mp4', type: 'video/mp4' }];
```

## Advanced Use Cases

### Streaming Application

For a Netflix or YouTube-like experience, you can provide multiple quality sources and handle playback events to trigger "Next Episode" functionality.

```typescript
protected readonly streamingConfig = {
  autoplay: true,
  hideControlsDelay: 4000,
  tracks: [/* subtitles */]
};

handleEvent(event: VideoPlayerEvent) {
  if (event.type === 'ended') {
    this.playNext();
  }
}
```

### Educational Platform

For LMS or educational videos, precise seeking and progress tracking are essential.

```typescript
protected readonly educationConfig = {
  seekStep: 15,
  showRetryButton: true
};

onTimeUpdate(event: VideoPlayerEvent) {
  // Save progress to your backend
  this.saveProgress(event.data.currentTime);
}
```

### Marketing Landing Pages

For hero videos or background loops, you can hide all controls and enable auto-loop.

```typescript
protected readonly marketingConfig = {
  autoplay: true,
  muted: true,
  loop: true,
  showControls: false,
  poster: 'assets/hero.jpg'
};
```

## Working with Signals

Since the player is built with Angular Signals, you can easily integrate it with your component's reactive state.

```typescript
public videoState = computed(() => {
  // Reactive logic based on player events or external state
});
```
