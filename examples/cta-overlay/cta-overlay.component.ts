import { Component, signal } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource, VideoPlayerEvent } from '@codewithrajat/rm-ng-video-player';

@Component({
    selector: 'app-cta-player',
    standalone: true,
    imports: [RmNgVideoPlayerComponent],
    template: `
    <div class="promo-container">
      <rm-ng-video-player 
        [videoSources]="sources"
        (playerEvent)="monitorTime($event)">
      </rm-ng-video-player>

      <!-- Timed CTA Overlay -->
      <div class="cta-widget" [class.visible]="isCtaVisible()">
        <span class="discount-tag">NEW ARRIVAL!</span>
        <h5>Premium Headphones</h5>
        <button class="buy-btn">Get 20% Discount</button>
      </div>
    </div>
  `,
    styles: [`
    .promo-container { position: relative; border-radius: 12px; overflow: hidden; }
    .cta-widget {
      position: absolute;
      bottom: 100px;
      right: 30px;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      transform: translateX(200%);
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .cta-widget.visible { transform: translateX(0); }
    .discount-tag { font-size: 10px; background: #e84393; color: white; padding: 2px 6px; border-radius: 4px; }
  `]
})
export class CtaPlayerComponent {
    protected readonly isCtaVisible = signal(false);
    protected readonly sources: VideoSource[] = [{ url: 'assets/product-promo.mp4', type: 'video/mp4' }];

    monitorTime(event: VideoPlayerEvent) {
        if (event.type === 'timeupdate') {
            const time = event.data.currentTime;
            // Show CTA during product display (10s - 25s)
            this.isCtaVisible.set(time >= 10 && time <= 25);
        }
    }
}
