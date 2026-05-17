import { Component, signal, ViewChild } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-restricted-lms',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="lms-container">
      <div class="lms-badge">COMPLIANCE MODE ACTIVE</div>
      
      <rm-ng-video-player 
        #player
        [videoSources]="sources" 
        (playerEvent)="handleEvent($event)">
      </rm-ng-video-player>
      
      <div class="status-panel">
        <p>Watched Coverage: <strong>{{ progressPercent() }}%</strong></p>
        <div class="lock-icon" *ngIf="isSeekingAhead()">⚠️ Skipping ahead is restricted!</div>
      </div>
    </div>
  `,
    styles: [`
    .lms-container { padding: 1.5rem; background: #fdfdfd; border: 1px solid #eee; }
    .status-panel { margin-top: 1rem; color: #666; }
    .lms-badge { background: #ff4757; color: white; padding: 4px 8px; border-radius: 4px; margin-bottom: 10px; display: inline-block; font-size: 12px; }
  `]
})
export class RestrictedLmsComponent {
    @ViewChild('player') player!: RmNgVideoPlayerComponent;

    protected readonly maxWatchedTime = signal(0);
    protected readonly progressPercent = signal(0);
    protected readonly isSeekingAhead = signal(false);

    protected readonly sources: VideoSource[] = [
        { url: 'assets/lesson-01.mp4', type: 'video/mp4' }
    ];

    handleEvent(event: VideoPlayerEvent) {
        if (event.type === 'timeupdate') {
            if (event.data.currentTime > this.maxWatchedTime()) {
                this.maxWatchedTime.set(event.data.currentTime);
                this.progressPercent.set(Math.floor((event.data.currentTime / event.data.duration) * 100));
            }
        }

        if (event.type === 'volumechange') {
            // Log if user mutes to ensure attention
        }
    }
}
