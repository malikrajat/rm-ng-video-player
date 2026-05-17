import { Component, signal, effect } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-analytics-player',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="analytics-dashboard">
      <div class="stats-panel">
        <div class="stat">
          <label>Status:</label>
          <span [class.active]="isPlaying()">{{ isPlaying() ? 'LIVE' : 'IDLE' }}</span>
        </div>
        <div class="stat">
          <label>Progress:</label>
          <span>{{ progressPercent() }}%</span>
        </div>
      </div>

      <rm-ng-video-player 
        [videoSources]="sources"
        (playerEvent)="trackEngagement($event)">
      </rm-ng-video-player>

      <div class="log-panel">
        <h4>Critical Event Log</h4>
        <ul>
          @for (log of eventLogs(); track $index) {
            <li>[{{log.time}}] Event: {{log.type}}</li>
          }
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .analytics-dashboard { padding: 1rem; font-family: monospace; }
    .stats-panel { display: flex; gap: 2rem; margin-bottom: 1rem; }
    .stat span.active { color: #00d4aa; font-weight: bold; }
    .log-panel { margin-top: 1rem; max-height: 150px; overflow-y: auto; background: #eee; padding: 10px; }
  `]
})
export class AnalyticsPlayerComponent {
    protected readonly isPlaying = signal(false);
    protected readonly progressPercent = signal(0);
    protected readonly eventLogs = signal<{ time: string, type: string }[]>([]);

    protected readonly sources: VideoSource[] = [
        { url: 'https://example.com/demo.mp4', type: 'video/mp4' }
    ];

    trackEngagement(event: VideoPlayerEvent) {
        const timestamp = new Date().toLocaleTimeString();

        switch (event.type) {
            case 'play':
                this.isPlaying.set(true);
                this.addLog(timestamp, 'PLAYBACK_START');
                break;
            case 'pause':
                this.isPlaying.set(false);
                this.addLog(timestamp, 'PLAYBACK_PAUSE');
                break;
            case 'timeupdate':
                this.progressPercent.set(Math.floor(event.data));
                break;
        }
    }

    private addLog(time: string, type: string) {
        this.eventLogs.update(logs => [{ time, type }, ...logs].slice(0, 5));
    }
}
