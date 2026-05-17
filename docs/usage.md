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

### Captions and Subtitles

To make your video content accessible and support multiple languages, you can add subtitles or closed captions using the `tracks` property in your `VideoPlayerConfig`. 

Ensure your caption files are in WebVTT format (`.vtt`). In an Angular project, place these files in your `public` directory (for Angular 17+ standalone) or `src/assets` directory so they are served correctly.

```typescript
protected readonly accessibleConfig = {
  tracks: [
    {
      src: '/sample-captions.vtt', // Path relative to public/assets folder
      kind: 'subtitles',
      srclang: 'en',
      label: 'English Subtitles',
      default: true // Show this track by default
    },
    {
      src: '/assets/spanish-captions.vtt',
      kind: 'subtitles',
      srclang: 'es',
      label: 'Español Subtítulos'
    }
  ]
};
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
