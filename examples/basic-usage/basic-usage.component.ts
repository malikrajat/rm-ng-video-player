import { Component } from '@angular/core';
import { RmNgVideoPlayerComponent, VideoSource } from '@codewithrajat/rm-ng-video-player';

@Component({
  selector: 'app-basic-player',
  standalone: true,
  imports: [RmNgVideoPlayerComponent],
  template: `
    <div class="example-container">
      <h2>Basic Video Player</h2>
      <rm-ng-video-player [videoSources]="sources"></rm-ng-video-player>
    </div>
  `,
  styles: [`
    .example-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
  `]
})
export class BasicPlayerComponent {
  protected readonly sources: VideoSource[] = [
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4'
    }
  ];
}
