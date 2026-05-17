import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerConfig } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-advanced-player',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="pro-player-suite">
      <header>
        <h3>Professional Video Suite</h3>
        <p>Premium experience with quality switching and custom metadata.</p>
      </header>
      
      <rm-ng-video-player 
        [videoSources]="sources" 
        [videoConfig]="config">
      </rm-ng-video-player>
    </div>
  `,
    styles: [`
    .pro-player-suite {
      background: #0a0a0a;
      padding: 2rem;
      border-radius: 12px;
      color: white;
    }
  `]
})
export class AdvancedPlayerComponent {
    protected readonly sources: VideoSource[] = [
        {
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            type: 'video/mp4',
            label: '4K Ultra HD'
        },
        {
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            type: 'video/mp4',
            label: '1080p HD'
        }
    ];

    protected readonly config: VideoPlayerConfig = {
        poster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200',
        autoplay: false,
        preload: 'metadata',
        showRetryButton: true
    };
}
