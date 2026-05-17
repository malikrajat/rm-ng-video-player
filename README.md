# RM Angular Video Player

<p align="left">
  <img src="https://img.shields.io/npm/v/rm-range-slider.svg" alt="npm version">
  <img src="https://img.shields.io/badge/Stability-production--ready-success" alt="Production ready">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license">
  <img src="https://img.shields.io/badge/Angular-14%20to%2021-blue" alt="Angular support range">
  <img src="https://img.shields.io/badge/Ivy-compatible-blue" alt="Ivy compatible">
  <img src="https://img.shields.io/badge/Standalone-supported-success" alt="Standalone API">
  <img src="https://img.shields.io/badge/AOT-compatible-blue" alt="AOT compatible">
  <img src="https://img.shields.io/badge/SSR-compatible-success" alt="SSR compatible">
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="Strict TS">
  <img src="https://img.shields.io/badge/tree--shaking-supported-success" alt="Tree-shakable">
  <img src="https://img.shields.io/badge/Side%20Effects-none-blue" alt="No side effects">
  <img src="https://img.shields.io/badge/Linting-enabled-success" alt="Linting">
  <img src="https://img.shields.io/badge/Tests-covered-blue" alt="Tests">
  <img src="https://img.shields.io/badge/Coverage-90%25-success" alt="Coverage">
  <img src="https://img.shields.io/badge/A11y-WCAG%202.1-success" alt="Accessibility compliant">
  <img src="https://img.shields.io/badge/API-documented-blue" alt="API docs">
  <img src="https://img.shields.io/badge/Examples-available-success" alt="Examples">
  <!-- <img src="https://img.shields.io/bundlephobia/minzip/rm-range-slider" alt="minzipped size"> -->
  <img src="https://img.shields.io/badge/Dependencies-none-success" alt="No dependencies">
  <!-- <img src="https://img.shields.io/npm/dw/rm-range-slider" alt="weekly downloads"> -->
  <img src="https://img.shields.io/npm/dt/rm-range-slider" alt="total downloads">
  <img src="https://img.shields.io/npm/last-update/rm-range-slider" alt="Last update">
  <img src="https://img.shields.io/badge/Maintained-yes-success" alt="Maintained">
  <img src="https://img.shields.io/badge/SemVer-compliant-blue" alt="SemVer">

[//]: # (  <img src="https://img.shields.io/github/issues/malikrajat/rm-ng-video-player" alt="Open issues">)
[//]: # (  <img src="https://img.shields.io/github/stars/malikrajat/rm-ng-video-player" alt="GitHub stars">)
</p>

## See It In Action

<div align="center">

  <img src="https://github.com/malikrajat/rm-ng-video-player/blob/main/assets/demo.png" alt="rm-ng-video-player Demo" width="800"/>

</div>

---

<p align="center">
**The most advanced, feature-rich Angular video player with YouTube-style controls and Apple glassmorphism design. Built for modern Angular applications using the latest signals API and standalone components.**
</p>

---

## Table of Contents

- [**Interactive Examples**](examples/README.md) - Explore functional code snippets.
- [**Setup & Installation**](docs/setup.md) - Get up and running in minutes.
- [**Usage Guide**](docs/usage.md) - Basic and advanced usage patterns.
- [**API Reference**](docs/api-reference.md) - Inputs, outputs, and interfaces.
- [**Features**](docs/features.md) - Detailed look at design and technical capabilities.
- [**Keyboard Shortcuts**](docs/keyboard-shortcuts.md) - Productivity-boosting controls.
- [**Customization & Theming**](docs/theming.md) - CSS variables and theming guide.
- [**Browser Support**](docs/browser-support.md) - Compatibility and platform matrix.
- [**Best Practices**](docs/best-practices.md) - Performance and accessibility tips.


## Features

- **Apple Glassmorphism UI**: Stunning modern design with blur effects.
- **YouTube Controls**: Intuitive playback interactions.
- **Angular 21 Signals**: High-performance, reactive architecture.
- **Zoneless Support**: Optimized for modern Angular environments.
- **Standalone Component**: Plug-and-play modularity.
- **Rich Interaction**: PiP, Captions, Sleep Timer, and more.

## Quick Start

```bash
npm install @codewithrajat/rm-ng-video-player
```

```typescript
import { RmNgVideoPlayerComponent } from '@codewithrajat/rm-ng-video-player';
import {
  VideoSource,
  VideoPlayerConfig,
} from '@codewithrajat/rm-ng-video-player';

@Component({
  imports: [RmNgVideoPlayerComponent],
  template: `
    <rm-ng-video-player
      [videoSources]="sources"
      [videoConfig]="config">
    </rm-ng-video-player>
  `
})
export class AppComponent {
  protected readonly sources: VideoSource[] = [
    {
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'video/mp4',
      label: '4K',
    },
    {
      url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      type: 'video/mp4',
      label: 'HD',
    },
  ];

  protected readonly config: VideoPlayerConfig = {
    autoplay: false,
    loop: false,
    muted: false,
    playsinline: true,
    preload: 'metadata',
    showControls: true,
    showFullscreenButton: true,
    showVolumeButton: true,
    showProgressBar: true,
    showRetryButton: true,
    hideControlsDelay: 2500,
    seekStep: 10,
    volumeStep: 0.1,
    replayOnEnd: true,
    poster:
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&h=675&fit=crop',
    tracks: [
      {
        src: './sample-captions.vtt',
        kind: 'subtitles',
        srclang: 'en',
        label: 'English Subtitles',
        default: true,
      },
    ],
  };

  onPlayerEvent(event: any) {
    console.log('Player event:', event.type);
  }
}

```
## Live Demo & Playground

#### Try it yourself! Interactive demos available now:

<div align="center">

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://stackblitz.com/edit/stackblitz-starters-uycmkwrk" target="_blank">
        <img src="https://img.shields.io/badge/StackBlitz_Demo-1976D2?style=for-the-badge&logo=stackblitz&logoColor=white" alt="StackBlitz Demo"/>
      </a>
      <br/><br/>
      <sub><b>Interactive Playground</b></sub><br/>
      <sub>Try all features live in your browser</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-ng-video-player/tree/main/examples" target="_blank">
        <img src="https://img.shields.io/badge/Code_Examples-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Examples"/>
      </a>
      <br/><br/>
      <sub><b>Complete Examples</b></sub><br/>
      <sub>Copy-paste ready code samples</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://www.npmjs.com/package/@codewithrajat/rm-ng-video-player/" target="_blank">
        <img src="https://img.shields.io/badge/npm_Package-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm Package"/>
      </a>
      <br/><br/>
      <sub><b>npm Registry</b></sub><br/>
      <sub>Install and view package details</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://github.com/malikrajat/rm-ng-video-player" target="_blank">
        <img src="https://img.shields.io/badge/GitHub_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository"/>
      </a>
      <br/><br/>
      <sub><b>Source Code</b></sub><br/>
      <sub>Star, fork, and contribute</sub>
    </td>
  </tr>
</table>

</div>


## Installation & Setup

For detailed installation instructions, see our [Installation Guide](./docs/INSTALLATION.md).

## Usage

For comprehensive usage examples and API documentation, see our [Usage Guide](./docs/USAGE.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support This Project

If **rm-range-slider** has helped you build better Angular applications, please consider:

### Star This Repository

A star helps other developers discover this library!

[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-ng-video-player?style=social)](https://github.com/malikrajat/rm-ng-video-player/stargazers)

### Why Your Star Matters

- Increases visibility in the Angular community
- Supports ongoing development and maintenance
- Encourages more open-source contributions
- Helps other developers find quality tools


## Statistics

[//]: # ([![npm downloads]&#40;https://img.shields.io/npm/dt/@codewithrajat/rm-ng-video-player.svg&#41;]&#40;https://www.npmjs.com/package/@codewithrajat/rm-ng-video-player&#41;)
[![npm version](https://img.shields.io/npm/v/@codewithrajat/rm-ng-video-player.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-video-player)
[![GitHub issues](https://img.shields.io/github/issues/malikrajat/rm-ng-video-player.svg)](https://github.com/malikrajat/rm-ng-video-player/issues)
[![GitHub stars](https://img.shields.io/github/stars/malikrajat/rm-ng-video-player.svg?style=social)](https://github.com/malikrajat/rm-ng-video-player/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malikrajat/rm-ng-video-player/blob/main/LICENSE)


## Acknowledgments

This library wouldn't be possible without these amazing open-source projects:

- **[Angular Team](https://angular.io/)** - Amazing framework and ecosystem
- **[Angular Material](https://material.angular.io/)** - Material Design components
- **Contributors** - Thank you for making this library better

Special thanks to the Angular community for feedback and support!


## Support and Community

### Getting Help

Need assistance? We're here to help!

| Support Channel | Link | Best For |
|----------------|------|----------|
| Bug Reports | [Report Bug](https://github.com/malikrajat/rm-ng-video-player/issues/new?template=bug_report.md) | Technical issues |
| Feature Requests | [Request Feature](https://github.com/malikrajat/rm-ng-video-player/issues/new?template=feature_request.md) | New features |
| Discussions | [Join Discussion](https://github.com/malikrajat/rm-ng-video-player/discussions) | General questions |
| Email | [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com?subject=rm-ng-video-player%20Support) | Direct support |

### Documentation

- [GitHub Repository](https://github.com/malikrajat/rm-ng-video-player)
- [npm Package](https://www.npmjs.com/package/@codewithrajat/rm-ng-video-player)
- [Changelog](https://github.com/malikrajat/rm-ng-video-player/blob/main/CHANGELOG.md)

### Community

- Star the repository to show support
- Watch for updates and new releases
- Share your use cases and feedback
- Contribute code or documentation

### Stay Updated

- Follow the project on [GitHub](https://github.com/malikrajat/rm-ng-video-player)
- Star the repository for updates
- Watch for new releases

## Other Libraries

### UI Components

| Library                | Description                                                              | npm Link                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **rm-range-slider**    | Lightweight two-thumb range slider with tooltips and color customization | [![npm](https://img.shields.io/npm/v/rm-range-slider.svg)](https://www.npmjs.com/package/rm-range-slider)       |
| **rm-ng-range-slider** | Angular-specific version of the dual range slider                        | [![npm](https://img.shields.io/npm/v/rm-ng-range-slider.svg)](https://www.npmjs.com/package/rm-ng-range-slider) |
| **rm-carousel**        | Simple, responsive carousel component                                    | [![npm](https://img.shields.io/npm/v/rm-carousel.svg)](https://www.npmjs.com/package/rm-carousel)               |
| **rm-image-slider**    | Minimal image slider with smooth transitions                             | [![npm](https://img.shields.io/npm/v/rm-image-slider.svg)](https://www.npmjs.com/package/rm-image-slider)       |
| **rm-ng-star-rating**  | Configurable Angular star rating component with readonly mode            | [![npm](https://img.shields.io/npm/v/rm-ng-star-rating.svg)](https://www.npmjs.com/package/rm-ng-star-rating)   |

---

### PDF & Export Libraries

| Library                                | Description                                                  | npm Link                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-export-to-csv**                | Export JSON data to CSV with zero dependencies               | [![npm](https://img.shields.io/npm/v/rm-ng-export-to-csv.svg)](https://www.npmjs.com/package/rm-ng-export-to-csv)                               |
| **@codewithrajat/rm-ng-pdf-export**    | Image-based PDF export tool for Angular applications         | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-pdf-export.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-pdf-export)       |
| **@codewithrajat/rm-ng-structure-pdf** | Generate structured PDFs for reports, invoices, or documents | [![npm](https://img.shields.io/npm/v/@codewithrajat/rm-ng-structure-pdf.svg)](https://www.npmjs.com/package/@codewithrajat/rm-ng-structure-pdf) |

---

### Utility Libraries

| Library                        | Description                                             | npm Link                                                                                                                        |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **rm-ng-device-detection**     | Detect device type, OS, and browser in Angular          | [![npm](https://img.shields.io/npm/v/rm-ng-device-detection.svg)](https://www.npmjs.com/package/rm-ng-device-detection)         |
| **rm-colorful-console-logger** | Stylish multi-color console logger for better debugging | [![npm](https://img.shields.io/npm/v/rm-colorful-console-logger.svg)](https://www.npmjs.com/package/rm-colorful-console-logger) |

---

### Notifications

| Library           | Description                                       | npm Link                                                                                              |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **rm-pushnotify** | Lightweight push-style toast notification utility | [![npm](https://img.shields.io/npm/v/rm-pushnotify.svg)](https://www.npmjs.com/package/rm-pushnotify) |

---

### Meta & Personal Branding

| Library         | Description                                                      | npm Link                                                                                          |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **about-rajat** | Developer portfolio package for branding and quick personal info | [![npm](https://img.shields.io/npm/v/about-rajat.svg)](https://www.npmjs.com/package/about-rajat) |



### All Packages

Browse all my packages:
- [npm: @codewithrajat](https://www.npmjs.com/~codewithrajat)
- [npm: rajatmalik](https://www.npmjs.com/~rajatmalik)
- [GitHub: @malikrajat](https://github.com/malikrajat?tab=repositories)

## Author

**Rajat Malik**

Full-stack developer passionate about creating developer-friendly tools and libraries.

- Website: [rajatmalik.dev](https://rajatmalik.dev)
- Email: [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com)
- LinkedIn: [errajatmalik](https://linkedin.com/in/errajatmalik)
- GitHub: [@malikrajat](https://github.com/malikrajat)
- npm: [rajatmalik](https://www.npmjs.com/~rajatmalik)

---


<p align="center">
  <b>Built with care for the Angular community</b>
</p>

<p align="center">
  <a href="https://github.com/malikrajat/rm-ng-video-player/stargazers">Star on GitHub</a> •
  <a href="https://www.npmjs.com/package/@codewithrajat/rm-ng-video-player">View on npm</a> •
  <a href="https://github.com/malikrajat/rm-ng-video-player/issues">Report Issue</a>
</p>

<p align="center">
  Made with dedication by <a href="https://rajatmalik.dev">Rajat Malik</a>
</p>
