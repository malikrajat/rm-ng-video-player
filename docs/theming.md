# Customization & Theming

RM Angular Video Player is designed to be highly themeable, allowing you to match your brand's look and feel perfectly.

## CSS Custom Properties

You can override the default styles by providing values for the following CSS variables in your global or component styles.

### Brand Colors
```css
.rm-video-player {
  --player-primary-color: #00d4aa;    /* Accents, progress bar */
  --player-background: #1a1a1a;      /* Main background */
  --player-text-color: #ffffff;      /* Main text and icons */
}
```

### UI Shaping
```css
.rm-video-player {
  --player-border-radius: 12px;
  --control-button-size: 24px;
  --control-gap: 16px;
}
```

### Glassmorphism Effects
```css
.rm-video-player {
  --player-blur: blur(40px);
  --player-saturation: saturate(150%);
}
```

## Predefined Themes

The library supports high-level theme switching through the `VideoPlayerConfig`.

```typescript
const config: VideoPlayerConfig = {
  theme: 'dark' // options: 'default', 'dark', 'light', 'custom'
};
```

## Advanced Custom Styling

Since the component uses standard CSS classes, you can further customize any element by targeting its class.

```css
::ng-deep .rm-video-player__spinner {
  border-top-color: var(--my-custom-color);
}
```

> [!TIP]
> Use `::ng-deep` carefully and wrap your styles within a specific class to avoid global style leakage.
