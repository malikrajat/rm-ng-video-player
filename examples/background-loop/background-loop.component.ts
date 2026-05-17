import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerConfig } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-hero-background',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="hero-container">
      <!-- Background Video -->
      <rm-ng-video-player 
        class="background-video"
        [videoSources]="sources" 
        [videoConfig]="config">
      </rm-ng-video-player>
      
      <!-- Overlay Content -->
      <div class="hero-overlay">
        <h1 class="hero-title">Elevate Your UX</h1>
        <p class="hero-subtitle">cinematic video backgrounds in Angular</p>
        <button class="cta-button">Explore Feature</button>
      </div>
    </div>
  `,
    styles: [`
    .hero-container {
      position: relative;
      height: 600px;
      width: 100%;
      background: #000;
      border-radius: 20px;
      overflow: hidden;
    }
    .background-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.4);
      z-index: 5;
      color: white;
    }
    .cta-button {
      padding: 1rem 2rem;
      background: #00d4aa;
      border: none;
      border-radius: 30px;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }
  `]
})
export class HeroBackgroundComponent {
    protected readonly sources: VideoSource[] = [
        { url: 'https://images.unsplash.com/video-1620216173000-8456de95e63b', type: 'video/mp4' }
    ];

    protected readonly config: VideoPlayerConfig = {
        autoplay: true,
        muted: true,
        loop: true,
        showControls: false,
        preload: 'auto'
    };
}
