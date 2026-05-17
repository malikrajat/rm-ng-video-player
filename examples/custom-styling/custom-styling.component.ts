import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-branded-player',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="theme-showcase">
      <h3>Brand Identity Theme</h3>
      <rm-ng-video-player 
        class="brand-theme" 
        [videoSources]="sources">
      </rm-ng-video-player>
    </div>
  `,
    styles: [`
    .theme-showcase {
      padding: 2rem;
      background: #f8f9fa;
    }
    
    .brand-theme {
      --player-primary-color: #ff6b6b;   /* Coral Brand Color */
      --player-border-radius: 4px;      /* Sharp edges */
      --player-background: #2d3436;     /* Slate Background */
      --player-text-color: #dfe6e9;     /* Light Text */
      --player-blur: none;              /* Disable glass effects for retro look */
    }
  `]
})
export class BrandedPlayerComponent {
    protected readonly sources: VideoSource[] = [
        { url: 'https://example.com/brand-video.mp4', type: 'video/mp4' }
    ];
}
