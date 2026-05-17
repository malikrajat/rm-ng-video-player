import { Component, signal } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerConfig, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-streaming-player',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="streaming-wrapper">
      <div class="playback-header">
        <span>S1 E{{currentEpisodeIndex() + 1}} — {{currentEpisode().title}}</span>
      </div>

      <rm-ng-video-player 
        [videoSources]="currentEpisode().sources" 
        [videoConfig]="config"
        (playerEvent)="handleEvent($event)">
      </rm-ng-video-player>

      <div class="playlist">
        <h4>Up Next</h4>
        <div class="next-item">E{{currentEpisodeIndex() + 2}}: Next Episode Preview</div>
      </div>
    </div>
  `,
    styles: [`
    .streaming-wrapper { font-family: sans-serif; }
    .playback-header { padding: 10px; font-weight: bold; background: #222; color: #fff; }
    .playlist { margin-top: 1rem; color: #aaa; }
  `]
})
export class StreamingPlayerComponent {
    protected readonly currentEpisodeIndex = signal(0);

    protected readonly config: VideoPlayerConfig = {
        autoplay: true,
        hideControlsDelay: 5000,
        tracks: [
            { src: './assets/en.vtt', kind: 'subtitles', srclang: 'en', label: 'English', default: true }
        ]
    };

    protected readonly currentEpisode = () => ({
        title: 'The Beginning',
        sources: [{ url: 'episode1.mp4', type: 'video/mp4' }]
    });

    handleEvent(event: VideoPlayerEvent) {
        if (event.type === 'ended') {
            console.log('Transitioning to next episode...');
        }
    }
}
