# Best Practices & Performance

Maximize the efficiency and user experience of your video playback by following these community-tested best practices.

## Performance Tips

### 1. Preload Strategy
Use the `preload` configuration wisely.
- `metadata`: (Default) Best balance between speed and data usage. Loads only the duration and dimensions.
- `none`: Best for data-saving or when multiple videos are on a single page.
- `auto`: Best for hero videos where immediate playback is critical.

### 2. Multi-Resolution Sources
Always provide multiple video sources (e.g., 720p, 1080p, 4K). This allows the player to offer quality selection, ensuring a smooth experience for users on various internet speeds.

### 3. Poster Images
Provide a high-quality poster image. This improves perceived performance as the user sees a crisp image while the video metadata is being fetched.

## Accessibility (A11y)

### Provide Captions
Always include at least one subtitle/caption track. This is not only essential for users with hearing impairments but also preferred by many users in noisy or quiet environments.

### Meaningful Labels
Ensure your video sources and tracks have intuitive labels (e.g., "English (SDH)" instead of just "en").

## Development Best Practices

### Cleanup on Destroy
While the library handles domestic cleanup, ensure you unsubscribe from any custom event streams in your own `ngOnDestroy` or use `DestroyRef`.

### Use Change Detection Strategy
The player is optimized for `OnPush` change detection. Leverage this in your parent components to minimize unnecessary re-renders.

### Avoid Heavy Logic in Events
The `timeupdate` event fires frequently (several times per second). Avoid running heavy computations or blocking logic within this event handler.
