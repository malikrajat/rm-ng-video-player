import * as i0 from '@angular/core';
import { EventEmitter, signal, computed, Output, Input, ViewChild, ChangeDetectionStrategy, Component, inject, DestroyRef, effect, HostListener, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { merge, fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

class VideoProgressComponent {
    progressBar;
    currentTime = 0;
    duration = 0;
    buffered = null;
    seek = new EventEmitter();
    // Signals
    isDragging = signal(false, ...(ngDevMode ? [{ debugName: "isDragging" }] : []));
    isHovering = signal(false, ...(ngDevMode ? [{ debugName: "isHovering" }] : []));
    hoverX = signal(0, ...(ngDevMode ? [{ debugName: "hoverX" }] : []));
    // Computed signals
    progressPercentage = computed(() => {
        if (this.duration <= 0)
            return 0;
        return (this.currentTime / this.duration) * 100;
    }, ...(ngDevMode ? [{ debugName: "progressPercentage" }] : []));
    hoverPercentage = computed(() => {
        if (!this.progressBar)
            return 0;
        const rect = this.progressBar.nativeElement.getBoundingClientRect();
        return (this.hoverX() / rect.width) * 100;
    }, ...(ngDevMode ? [{ debugName: "hoverPercentage" }] : []));
    hoverTime = computed(() => {
        const percentage = this.hoverPercentage();
        return (percentage / 100) * this.duration;
    }, ...(ngDevMode ? [{ debugName: "hoverTime" }] : []));
    bufferedRanges = computed(() => {
        if (!this.buffered || this.duration <= 0)
            return [];
        const ranges = [];
        for (let i = 0; i < this.buffered.length; i++) {
            ranges.push({
                start: this.buffered.start(i),
                end: this.buffered.end(i),
            });
        }
        return ranges;
    }, ...(ngDevMode ? [{ debugName: "bufferedRanges" }] : []));
    onProgressClick(event) {
        if (this.isDragging())
            return;
        const seekTime = this.getSeekTimeFromEvent(event);
        this.seek.emit(seekTime);
    }
    onMouseDown(event) {
        event.preventDefault();
        this.isDragging.set(true);
        const seekTime = this.getSeekTimeFromEvent(event);
        this.seek.emit(seekTime);
        const handleMouseMove = (e) => {
            const seekTime = this.getSeekTimeFromEvent(e);
            this.seek.emit(seekTime);
        };
        const handleMouseUp = () => {
            this.isDragging.set(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    onMouseMove(event) {
        if (this.isDragging())
            return;
        this.isHovering.set(true);
        const rect = this.progressBar.nativeElement.getBoundingClientRect();
        this.hoverX.set(event.clientX - rect.left);
    }
    onMouseLeave() {
        this.isHovering.set(false);
    }
    getSeekTimeFromEvent(event) {
        const rect = this.progressBar.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        return percentage * this.duration;
    }
    formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0)
            return '0:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: VideoProgressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.0.0-next.6", type: VideoProgressComponent, isStandalone: true, selector: "rm-video-progress", inputs: { currentTime: "currentTime", duration: "duration", buffered: "buffered" }, outputs: { seek: "seek" }, viewQueries: [{ propertyName: "progressBar", first: true, predicate: ["progressBar"], descendants: true, static: true }], ngImport: i0, template: `
    <div class="rm-video-progress">
      <div
        #progressBar
        class="rm-video-progress__bar"
        (click)="onProgressClick($event)"
        (mousedown)="onMouseDown($event)"
        (mousemove)="onMouseMove($event)"
        (mouseleave)="onMouseLeave()"
        [attr.aria-label]="'Seek to ' + formatTime(hoverTime())"
      >
        <!-- Buffered progress -->
        @if (buffered && duration > 0) {
          @for (range of bufferedRanges(); track $index) {
            <div
              class="rm-video-progress__buffered"
              [style.left.%]="(range.start / duration) * 100"
              [style.width.%]="((range.end - range.start) / duration) * 100"
            ></div>
          }
        }

        <!-- Played progress -->
        <div class="rm-video-progress__played" [style.width.%]="progressPercentage()"></div>

        <!-- Hover preview -->
        @if (isHovering()) {
          <div class="rm-video-progress__hover-preview" [style.left.%]="hoverPercentage()">
            <div class="rm-video-progress__hover-time">
              {{ formatTime(hoverTime()) }}
            </div>
          </div>
        }

        <!-- Scrubber -->
        <div
          class="rm-video-progress__scrubber"
          [style.left.%]="progressPercentage()"
          [class.rm-video-progress__scrubber--dragging]="isDragging()"
        ></div>
      </div>
    </div>
  `, isInline: true, styles: [".rm-video-progress{position:relative;width:100%;height:24px;display:flex;align-items:center;cursor:pointer;padding:10px 0}.rm-video-progress__bar{position:relative;width:100%;height:3px;background:#ffffff26;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:2px;overflow:hidden;transition:all .3s cubic-bezier(.25,.46,.45,.94)}.rm-video-progress:hover .rm-video-progress__bar{height:5px;background:#ffffff40}.rm-video-progress__buffered{position:absolute;top:0;height:100%;background:#ffffff4d;border-radius:2px;transition:background .3s ease}.rm-video-progress__played{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,#fff,#fffc);border-radius:2px;transition:width .1s ease;box-shadow:0 0 8px #ffffff4d}.rm-video-progress__scrubber{position:absolute;top:50%;width:14px;height:14px;background:#fff;backdrop-filter:blur(10px) saturate(180%);-webkit-backdrop-filter:blur(10px) saturate(180%);border:2px solid rgba(255,255,255,.8);border-radius:50%;transform:translate(-50%) translateY(-50%);opacity:0;transition:all .3s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 12px #0000004d,inset 0 1px #ffffff80;cursor:grab}.rm-video-progress:hover .rm-video-progress__scrubber,.rm-video-progress__scrubber--dragging{opacity:1}.rm-video-progress__scrubber--dragging{transform:translate(-50%) translateY(-50%) scale(1.2);cursor:grabbing;box-shadow:0 6px 20px #0006,inset 0 1px #fff9}.rm-video-progress__hover-preview{position:absolute;bottom:100%;transform:translate(-50%);margin-bottom:8px;pointer-events:none}.rm-video-progress__hover-time{background:#000c;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:500;white-space:nowrap}.rm-video-progress__hover-time:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(0,0,0,.8)}@media (max-width: 480px){.rm-video-progress{height:24px}.rm-video-progress__bar{height:6px}.rm-video-progress:hover .rm-video-progress__bar{height:8px}.rm-video-progress__scrubber{width:16px;height:16px}}@media (pointer: coarse){.rm-video-progress{height:28px}.rm-video-progress__bar{height:8px}.rm-video-progress__scrubber{width:18px;height:18px;opacity:1}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: VideoProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-video-progress', standalone: true, imports: [CommonModule], template: `
    <div class="rm-video-progress">
      <div
        #progressBar
        class="rm-video-progress__bar"
        (click)="onProgressClick($event)"
        (mousedown)="onMouseDown($event)"
        (mousemove)="onMouseMove($event)"
        (mouseleave)="onMouseLeave()"
        [attr.aria-label]="'Seek to ' + formatTime(hoverTime())"
      >
        <!-- Buffered progress -->
        @if (buffered && duration > 0) {
          @for (range of bufferedRanges(); track $index) {
            <div
              class="rm-video-progress__buffered"
              [style.left.%]="(range.start / duration) * 100"
              [style.width.%]="((range.end - range.start) / duration) * 100"
            ></div>
          }
        }

        <!-- Played progress -->
        <div class="rm-video-progress__played" [style.width.%]="progressPercentage()"></div>

        <!-- Hover preview -->
        @if (isHovering()) {
          <div class="rm-video-progress__hover-preview" [style.left.%]="hoverPercentage()">
            <div class="rm-video-progress__hover-time">
              {{ formatTime(hoverTime()) }}
            </div>
          </div>
        }

        <!-- Scrubber -->
        <div
          class="rm-video-progress__scrubber"
          [style.left.%]="progressPercentage()"
          [class.rm-video-progress__scrubber--dragging]="isDragging()"
        ></div>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".rm-video-progress{position:relative;width:100%;height:24px;display:flex;align-items:center;cursor:pointer;padding:10px 0}.rm-video-progress__bar{position:relative;width:100%;height:3px;background:#ffffff26;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:2px;overflow:hidden;transition:all .3s cubic-bezier(.25,.46,.45,.94)}.rm-video-progress:hover .rm-video-progress__bar{height:5px;background:#ffffff40}.rm-video-progress__buffered{position:absolute;top:0;height:100%;background:#ffffff4d;border-radius:2px;transition:background .3s ease}.rm-video-progress__played{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,#fff,#fffc);border-radius:2px;transition:width .1s ease;box-shadow:0 0 8px #ffffff4d}.rm-video-progress__scrubber{position:absolute;top:50%;width:14px;height:14px;background:#fff;backdrop-filter:blur(10px) saturate(180%);-webkit-backdrop-filter:blur(10px) saturate(180%);border:2px solid rgba(255,255,255,.8);border-radius:50%;transform:translate(-50%) translateY(-50%);opacity:0;transition:all .3s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 12px #0000004d,inset 0 1px #ffffff80;cursor:grab}.rm-video-progress:hover .rm-video-progress__scrubber,.rm-video-progress__scrubber--dragging{opacity:1}.rm-video-progress__scrubber--dragging{transform:translate(-50%) translateY(-50%) scale(1.2);cursor:grabbing;box-shadow:0 6px 20px #0006,inset 0 1px #fff9}.rm-video-progress__hover-preview{position:absolute;bottom:100%;transform:translate(-50%);margin-bottom:8px;pointer-events:none}.rm-video-progress__hover-time{background:#000c;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:500;white-space:nowrap}.rm-video-progress__hover-time:after{content:\"\";position:absolute;top:100%;left:50%;transform:translate(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(0,0,0,.8)}@media (max-width: 480px){.rm-video-progress{height:24px}.rm-video-progress__bar{height:6px}.rm-video-progress:hover .rm-video-progress__bar{height:8px}.rm-video-progress__scrubber{width:16px;height:16px}}@media (pointer: coarse){.rm-video-progress{height:28px}.rm-video-progress__bar{height:8px}.rm-video-progress__scrubber{width:18px;height:18px;opacity:1}}\n"] }]
        }], propDecorators: { progressBar: [{
                type: ViewChild,
                args: ['progressBar', { static: true }]
            }], currentTime: [{
                type: Input
            }], duration: [{
                type: Input
            }], buffered: [{
                type: Input
            }], seek: [{
                type: Output
            }] } });

class RmNgVideoPlayerComponent {
    elementRef;
    videoElement;
    destroyRef = inject(DestroyRef);
    // Input signals
    set videoConfig(config) {
        this.config.set({ ...this.defaultConfig, ...config });
    }
    set videoSources(sources) {
        this.sources.set(sources);
        if (sources.length > 0) {
            this.currentSource.set(sources[0]);
        }
    }
    // Output events
    playerEvent = new EventEmitter();
    stateChange = new EventEmitter();
    // Signals
    config = signal(this.defaultConfig, ...(ngDevMode ? [{ debugName: "config" }] : []));
    sources = signal([], ...(ngDevMode ? [{ debugName: "sources" }] : []));
    currentSource = signal(null, ...(ngDevMode ? [{ debugName: "currentSource" }] : []));
    // Player state signals
    isPlaying = signal(false, ...(ngDevMode ? [{ debugName: "isPlaying" }] : []));
    isLoading = signal(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : []));
    hasError = signal(false, ...(ngDevMode ? [{ debugName: "hasError" }] : []));
    errorMessage = signal('', ...(ngDevMode ? [{ debugName: "errorMessage" }] : []));
    currentTime = signal(0, ...(ngDevMode ? [{ debugName: "currentTime" }] : []));
    duration = signal(0, ...(ngDevMode ? [{ debugName: "duration" }] : []));
    volume = signal(1, ...(ngDevMode ? [{ debugName: "volume" }] : []));
    isMuted = signal(false, ...(ngDevMode ? [{ debugName: "isMuted" }] : []));
    isFullscreen = signal(false, ...(ngDevMode ? [{ debugName: "isFullscreen" }] : []));
    bufferedRanges = signal(null, ...(ngDevMode ? [{ debugName: "bufferedRanges" }] : []));
    playbackSpeed = signal(1, ...(ngDevMode ? [{ debugName: "playbackSpeed" }] : []));
    // UI state signals
    showControls = signal(true, ...(ngDevMode ? [{ debugName: "showControls" }] : []));
    showVolumeSlider = signal(false, ...(ngDevMode ? [{ debugName: "showVolumeSlider" }] : []));
    showCaptions = signal(false, ...(ngDevMode ? [{ debugName: "showCaptions" }] : []));
    showSettingsMenu = signal(false, ...(ngDevMode ? [{ debugName: "showSettingsMenu" }] : []));
    currentSettingsPanel = signal(null, ...(ngDevMode ? [{ debugName: "currentSettingsPanel" }] : []));
    currentQuality = signal('auto', ...(ngDevMode ? [{ debugName: "currentQuality" }] : []));
    sleepTimer = signal(null, ...(ngDevMode ? [{ debugName: "sleepTimer" }] : []));
    sleepTimerActive = signal(false, ...(ngDevMode ? [{ debugName: "sleepTimerActive" }] : []));
    loopEnabled = signal(false, ...(ngDevMode ? [{ debugName: "loopEnabled" }] : []));
    controlsTimer = null;
    sleepTimerInstance = null;
    // Computed signals
    state = computed(() => ({
        isPlaying: this.isPlaying(),
        isLoading: this.isLoading(),
        hasError: this.hasError(),
        currentTime: this.currentTime(),
        duration: this.duration(),
        volume: this.volume(),
        isMuted: this.isMuted(),
        isFullscreen: this.isFullscreen(),
        bufferedRanges: this.bufferedRanges(),
    }), ...(ngDevMode ? [{ debugName: "state" }] : []));
    get defaultConfig() {
        return {
            autoplay: false,
            loop: false,
            muted: false,
            playsinline: true,
            preload: 'metadata',
            replayOnEnd: false,
            showControls: true,
            showFullscreenButton: true,
            showVolumeButton: true,
            showProgressBar: true,
            showRetryButton: true,
            hideControlsDelay: 3000,
            seekStep: 10,
            volumeStep: 0.1,
        };
    }
    constructor(elementRef) {
        this.elementRef = elementRef;
        // Effect to emit state changes
        effect(() => {
            this.stateChange.emit(this.state());
        });
        // Effect to handle fullscreen changes
        effect(() => {
            if (this.isFullscreen()) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = '';
            }
        });
    }
    onDocumentClick(event) {
        const target = event.target;
        const playerElement = this.elementRef.nativeElement;
        if (playerElement && !playerElement.contains(target)) {
            if (this.showSettingsMenu()) {
                this.showSettingsMenu.set(false);
                this.currentSettingsPanel.set(null);
            }
        }
    }
    ngOnInit() {
        // Initialize signals from config
        this.loopEnabled.set(this.config().loop);
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }
    ngOnDestroy() {
        if (this.controlsTimer) {
            clearTimeout(this.controlsTimer);
        }
        if (this.sleepTimerInstance) {
            clearTimeout(this.sleepTimerInstance);
        }
        // Cleanup fullscreen state
        if (this.isFullscreen()) {
            document.body.style.overflow = '';
        }
    }
    setupEventListeners() {
        const video = this.videoElement.nativeElement;
        // Fullscreen change events
        merge(fromEvent(document, 'fullscreenchange'), fromEvent(document, 'webkitfullscreenchange'), fromEvent(document, 'mozfullscreenchange'), fromEvent(document, 'MSFullscreenChange'))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            const isFullscreen = !!(document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement);
            this.isFullscreen.set(isFullscreen);
        });
        // Mouse movement for controls
        fromEvent(video, 'mousemove')
            .pipe(throttleTime(100), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.showControlsTemporarily();
        });
    }
    setupKeyboardShortcuts() {
        fromEvent(document, 'keydown')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(event => {
            // Skip if user is typing in an input field
            if (this.isInputFocused())
                return;
            switch (event.code) {
                case 'Space':
                    event.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.seek(this.currentTime() - this.config().seekStep);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.seek(this.currentTime() + this.config().seekStep);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.setVolume(Math.min(1, this.volume() + this.config().volumeStep));
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.setVolume(Math.max(0, this.volume() - this.config().volumeStep));
                    break;
                case 'KeyJ':
                    event.preventDefault();
                    this.seek(this.currentTime() - 10); // Skip backward 10s
                    break;
                case 'KeyL':
                    event.preventDefault();
                    this.seek(this.currentTime() + 10); // Skip forward 10s
                    break;
                case 'KeyM':
                    event.preventDefault();
                    this.toggleMute();
                    break;
                case 'KeyC':
                    event.preventDefault();
                    this.toggleCaptions();
                    break;
                case 'KeyI':
                    event.preventDefault();
                    this.togglePictureInPicture();
                    break;
                case 'KeyF':
                    event.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });
    }
    isInputFocused() {
        const activeElement = document.activeElement;
        if (!activeElement)
            return false;
        const tagName = activeElement.tagName.toLowerCase();
        const inputTypes = ['input', 'textarea', 'select'];
        const isContentEditable = activeElement.getAttribute('contenteditable') === 'true';
        return inputTypes.includes(tagName) || isContentEditable;
    }
    // Video event handlers
    onLoadStart() {
        this.isLoading.set(true);
        this.hasError.set(false);
        this.emitEvent('loadstart');
    }
    onLoadedMetadata() {
        const video = this.videoElement.nativeElement;
        this.duration.set(video.duration);
        this.initializeCaptions();
        this.emitEvent('loadedmetadata');
    }
    onLoadedData() {
        this.isLoading.set(false);
        this.emitEvent('loadeddata');
    }
    onCanPlay() {
        this.isLoading.set(false);
        this.emitEvent('canplay');
    }
    onCanPlayThrough() {
        this.emitEvent('canplaythrough');
    }
    onPlay() {
        this.isPlaying.set(true);
        this.emitEvent('play');
    }
    onPause() {
        this.isPlaying.set(false);
        this.emitEvent('pause');
    }
    onEnded() {
        this.isPlaying.set(false);
        this.emitEvent('ended');
        // Check if loop is enabled and restart video manually as fallback
        if (this.loopEnabled()) {
            const video = this.videoElement.nativeElement;
            // Reset video position immediately
            video.currentTime = 0;
            // Try to play the video
            video
                .play()
                .then(() => {
                this.isPlaying.set(true);
            })
                .catch(error => {
                // Silently handle loop restart failure
            });
        }
        else if (this.config().replayOnEnd) {
            // If replayOnEnd is enabled but loop is not, restart once
            const video = this.videoElement.nativeElement;
            // Reset video position immediately
            video.currentTime = 0;
            // Try to play the video once
            video
                .play()
                .then(() => {
                this.isPlaying.set(true);
            })
                .catch(error => {
                // Silently handle replay failure
            });
        }
    }
    onTimeUpdate() {
        const video = this.videoElement.nativeElement;
        this.currentTime.set(video.currentTime);
        this.emitEvent('timeupdate');
    }
    onProgress() {
        const video = this.videoElement.nativeElement;
        this.bufferedRanges.set(video.buffered);
        this.emitEvent('progress');
    }
    onVolumeChange() {
        const video = this.videoElement.nativeElement;
        this.volume.set(video.volume);
        this.isMuted.set(video.muted);
        this.emitEvent('volumechange');
    }
    onError(event) {
        this.isLoading.set(false);
        this.hasError.set(true);
        this.errorMessage.set('Failed to load video. Please try again.');
        this.emitEvent('error', { error: event });
    }
    // Control methods
    togglePlayPause() {
        const video = this.videoElement.nativeElement;
        if (this.isPlaying()) {
            video.pause();
        }
        else {
            video.play().catch(error => {
                this.onError(error);
            });
        }
        this.showControlsTemporarily();
    }
    seek(time) {
        const video = this.videoElement.nativeElement;
        const clampedTime = Math.max(0, Math.min(time, this.duration()));
        video.currentTime = clampedTime;
        this.currentTime.set(clampedTime);
        this.showControlsTemporarily();
    }
    setVolume(volume) {
        const video = this.videoElement.nativeElement;
        const clampedVolume = Math.max(0, Math.min(1, volume));
        video.volume = clampedVolume;
        this.volume.set(clampedVolume);
        if (clampedVolume > 0 && this.isMuted()) {
            this.toggleMute();
        }
        this.showControlsTemporarily();
    }
    toggleMute() {
        const video = this.videoElement.nativeElement;
        video.muted = !video.muted;
        this.isMuted.set(video.muted);
        this.showControlsTemporarily();
    }
    toggleFullscreen() {
        if (this.isFullscreen()) {
            this.exitFullscreen();
        }
        else {
            this.enterFullscreen();
        }
    }
    enterFullscreen() {
        const element = this.videoElement.nativeElement.parentElement;
        if (!element)
            return;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    retry() {
        this.hasError.set(false);
        this.errorMessage.set('');
        const video = this.videoElement.nativeElement;
        video.load();
    }
    // YouTube-style control methods
    skipBackward() {
        const video = this.videoElement.nativeElement;
        const newTime = Math.max(0, this.currentTime() - 10);
        video.currentTime = newTime;
        this.currentTime.set(newTime);
        this.showControlsTemporarily();
    }
    skipForward() {
        const video = this.videoElement.nativeElement;
        const newTime = Math.min(this.duration(), this.currentTime() + 10);
        video.currentTime = newTime;
        this.currentTime.set(newTime);
        this.showControlsTemporarily();
    }
    initializeCaptions() {
        const video = this.videoElement.nativeElement;
        const textTracks = video.textTracks;
        // Only proceed if tracks are configured, to prevent errors when no captions are provided.
        if (!this.config().tracks || this.config().tracks.length === 0) {
            return;
        }
        if (textTracks.length > 0) {
            // Set all caption/subtitle tracks to hidden initially
            for (let i = 0; i < textTracks.length; i++) {
                const track = textTracks[i];
                if (track.kind === 'captions' || track.kind === 'subtitles') {
                    track.mode = this.showCaptions() ? 'showing' : 'hidden';
                }
            }
        }
    }
    toggleCaptions() {
        const video = this.videoElement.nativeElement;
        const textTracks = video.textTracks;
        // Toggle the internal state
        const newCaptionState = !this.showCaptions();
        this.showCaptions.set(newCaptionState);
        if (textTracks.length > 0) {
            // Find caption or subtitle tracks
            for (let i = 0; i < textTracks.length; i++) {
                const track = textTracks[i];
                if (track.kind === 'captions' || track.kind === 'subtitles') {
                    // Set track mode based on caption state
                    track.mode = newCaptionState ? 'showing' : 'hidden';
                }
            }
        }
        this.showControlsTemporarily();
    }
    toggleSettings() {
        this.showSettingsMenu.set(!this.showSettingsMenu());
        this.showControlsTemporarily();
    }
    closeSettings() {
        this.showSettingsMenu.set(false);
    }
    setPlaybackSpeed(speed) {
        const video = this.videoElement.nativeElement;
        video.playbackRate = speed;
        this.playbackSpeed.set(speed);
        this.showControlsTemporarily();
    }
    openSettingsPanel(panel) {
        this.currentSettingsPanel.set(panel);
    }
    closeSettingsPanel() {
        this.currentSettingsPanel.set(null);
    }
    changeQuality(quality) {
        this.currentQuality.set(quality);
    }
    changeVideoSource(source) {
        const currentTime = this.videoElement.nativeElement.currentTime;
        const wasPlaying = this.isPlaying();
        // Change to the new source
        this.currentSource.set(source);
        // Preserve playback position and state
        setTimeout(() => {
            this.videoElement.nativeElement.currentTime = currentTime;
            if (wasPlaying) {
                this.videoElement.nativeElement.play();
            }
        }, 100);
        this.closeSettings();
        this.showControlsTemporarily();
    }
    getSpeedLabel() {
        const speed = this.playbackSpeed();
        return speed === 1 ? 'Normal' : `${speed}`;
    }
    getQualityLabel() {
        const currentSource = this.currentSource();
        if (currentSource && currentSource.label) {
            return currentSource.label;
        }
        return 'Auto';
    }
    setSleepTimer(minutes) {
        // Clear existing timer
        if (this.sleepTimerInstance) {
            clearTimeout(this.sleepTimerInstance);
            this.sleepTimerInstance = null;
        }
        if (minutes === null) {
            this.sleepTimer.set(null);
            this.sleepTimerActive.set(false);
            return;
        }
        this.sleepTimer.set(minutes);
        this.sleepTimerActive.set(true);
        // Set timer to pause video after specified minutes
        this.sleepTimerInstance = window.setTimeout(() => {
            if (this.isPlaying()) {
                this.togglePlayPause();
            }
            this.sleepTimerActive.set(false);
        }, minutes * 60 * 1000);
        this.showControlsTemporarily();
    }
    getSleepTimerLabel() {
        if (!this.sleepTimerActive())
            return 'Off';
        const minutes = this.sleepTimer();
        if (!minutes)
            return 'Off';
        if (minutes < 60) {
            return `${minutes} min`;
        }
        else if (minutes === 60) {
            return '1 hour';
        }
        else if (minutes === 90) {
            return '1.5 hours';
        }
        else {
            return `${minutes / 60} hours`;
        }
    }
    toggleLoop() {
        const newLoopState = !this.loopEnabled();
        this.loopEnabled.set(newLoopState);
        // Update the config to keep it in sync
        const currentConfig = this.config();
        this.config.set({ ...currentConfig, loop: newLoopState });
        // Also update video element directly as backup
        const video = this.videoElement.nativeElement;
        video.loop = newLoopState;
        // If enabling loop and video is at the end, restart immediately
        if (newLoopState && video.ended) {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise) {
                playPromise
                    .then(() => {
                    this.isPlaying.set(true);
                })
                    .catch(error => {
                    // Silently handle loop test failure
                });
            }
        }
        this.showControlsTemporarily();
    }
    togglePictureInPicture() {
        const video = this.videoElement.nativeElement;
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
        else if (video.requestPictureInPicture) {
            video.requestPictureInPicture().catch(() => {
                // Silently handle picture-in-picture failure
            });
        }
        this.showControlsTemporarily();
    }
    // UI methods
    onMouseEnter() {
        this.showControlsTemporarily();
    }
    onMouseLeave() {
        if (this.controlsTimer) {
            clearTimeout(this.controlsTimer);
        }
        this.showControls.set(false);
    }
    showControlsTemporarily() {
        this.showControls.set(true);
        if (this.controlsTimer) {
            clearTimeout(this.controlsTimer);
        }
        this.controlsTimer = window.setTimeout(() => {
            if (this.isPlaying()) {
                this.showControls.set(false);
            }
        }, this.config().hideControlsDelay);
    }
    formatTime(seconds) {
        if (isNaN(seconds))
            return '0:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    emitEvent(type, data) {
        this.playerEvent.emit({ type, data, timestamp: Date.now() });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: RmNgVideoPlayerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.0.0-next.6", type: RmNgVideoPlayerComponent, isStandalone: true, selector: "rm-ng-video-player", inputs: { videoConfig: "videoConfig", videoSources: "videoSources" }, outputs: { playerEvent: "playerEvent", stateChange: "stateChange" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "videoElement", first: true, predicate: ["videoElement"], descendants: true, static: true }], ngImport: i0, template: `
    <div
      class="rm-video-player"
      [class.rm-video-player--fullscreen]="isFullscreen()"
      [class.rm-video-player--loading]="isLoading()"
      [class.rm-video-player--error]="hasError()"
      [class.rm-video-player--controls-visible]="showControls()"
      [class.rm-video-player--playing]="isPlaying()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <!-- Apple-style center play button -->
      @if (!isLoading() && !hasError() && !isPlaying()) {
        <div class="rm-video-player__center-play" (click)="togglePlayPause()">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path d="M2 2L22 14L2 26V2Z" fill="currentColor" />
          </svg>
        </div>
      }

      <video
        #videoElement
        class="rm-video-player__video"
        [src]="currentSource()?.url"
        [poster]="config().poster"
        [muted]="isMuted()"
        [loop]="loopEnabled()"
        [autoplay]="config().autoplay"
        [attr.playsinline]="config().playsinline"
        [preload]="config().preload"
        (loadstart)="onLoadStart()"
        (loadedmetadata)="onLoadedMetadata()"
        (loadeddata)="onLoadedData()"
        (canplay)="onCanPlay()"
        (canplaythrough)="onCanPlayThrough()"
        (play)="onPlay()"
        (pause)="onPause()"
        (ended)="onEnded()"
        (timeupdate)="onTimeUpdate()"
        (progress)="onProgress()"
        (volumechange)="onVolumeChange()"
        (error)="onError($event)"
        (click)="togglePlayPause()"
      >
        @if (sources().length > 0) {
          @for (source of sources(); track source.url) {
            <source [src]="source.url" [type]="source.type" />
          }
        }

        @if (config().tracks && config().tracks!.length > 0) {
          @for (track of config().tracks!; track track.src) {
            <track
              [src]="track.src"
              [kind]="track.kind"
              [srclang]="track.srclang"
              [label]="track.label"
              [default]="track.default"
            />
          }
        }

        Your browser does not support the video tag.
      </video>

      @if (isLoading()) {
        <div class="rm-video-player__loading">
          <div class="rm-video-player__spinner"></div>
          <span>Loading...</span>
        </div>
      }

      @if (hasError()) {
        <div class="rm-video-player__error">
          <div class="rm-video-player__error-icon">⚠</div>
          <div class="rm-video-player__error-message">
            {{ errorMessage() }}
          </div>
          @if (config().showRetryButton) {
            <button class="rm-video-player__retry-button" (click)="retry()">Retry</button>
          }
        </div>
      }

      @if (showControls() && !hasError()) {
        <div class="rm-video-player__controls">
          <!-- Progress Bar (YouTube sequence 1) -->
          <rm-video-progress
            [currentTime]="currentTime()"
            [duration]="duration()"
            [buffered]="bufferedRanges()"
            (seek)="seek($event)"
          >
          </rm-video-progress>

          <div class="rm-video-player__controls-bottom">
            <!-- Left Controls Group (YouTube sequence 2) -->
            <div class="rm-video-player__controls-left">
              <!-- Play/Pause Button -->
              <button
                class="rm-control-btn rm-control-btn--play-pause"
                (click)="togglePlayPause()"
                [attr.data-tooltip]="isPlaying() ? 'Pause (Space)' : 'Play (Space)'"
              >
                <svg
                  *ngIf="!isPlaying()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg
                  *ngIf="isPlaying()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>

              <!-- Skip Backward 10s -->
              <button
                class="rm-control-btn rm-control-btn--skip rm-control-btn--skip-back"
                (click)="skipBackward()"
                data-tooltip="Skip backward 10s (J)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <!-- Curved arrow pointing left with replay symbol -->
                  <path
                    d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"
                  />
                  <!-- Double left arrows -->
                  <path d="M11 18V6l-2.5 6L11 18zm-4 0V6l-2.5 6L7 18z" />
                </svg>
              </button>

              <!-- Skip Forward 10s -->
              <button
                class="rm-control-btn rm-control-btn--skip rm-control-btn--skip-forward"
                (click)="skipForward()"
                data-tooltip="Skip forward 10s (L)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <!-- Curved arrow pointing right with forward symbol -->
                  <path
                    d="M12,5V1l5,5l-5,5V7c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6h2c0,4.42-3.58,8-8,8s-8-3.58-8-8S7.58,5,12,5z"
                  />
                  <!-- Double right arrows -->
                  <path d="M13 6v12l2.5-6L13 6zm4 0v12l2.5-6L17 6z" />
                </svg>
              </button>

              <!-- Volume Controls -->
              <div
                class="rm-volume-container"
                (mouseenter)="showVolumeSlider.set(true)"
                (mouseleave)="showVolumeSlider.set(false)"
              >
                <button
                  class="rm-control-btn rm-control-btn--volume"
                  (click)="toggleMute()"
                  [attr.data-tooltip]="isMuted() ? 'Unmute (M)' : 'Mute (M)'"
                >
                  <svg
                    *ngIf="!isMuted() && volume() > 0.5"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                    />
                  </svg>
                  <svg
                    *ngIf="!isMuted() && volume() <= 0.5 && volume() > 0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
                    />
                  </svg>
                  <svg
                    *ngIf="isMuted() || volume() === 0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                    />
                  </svg>
                </button>
                <div
                  class="rm-volume-slider-container"
                  [class.rm-volume-slider-container--visible]="showVolumeSlider()"
                >
                  <input
                    type="range"
                    class="rm-volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    [value]="volume()"
                    (input)="setVolume(+$any($event.target).value)"
                  />
                </div>
              </div>

              <!-- Time Display -->
              <div class="rm-time-display">
                <span class="rm-time-current">{{ formatTime(currentTime()) }}</span>
                <span class="rm-time-separator">/</span>
                <span class="rm-time-duration">{{ formatTime(duration()) }}</span>
              </div>
            </div>

            <!-- Right Controls Group (YouTube sequence 3) -->
            <div class="rm-video-player__controls-right">
              <!-- Captions/Subtitles Button -->
              <button
                class="rm-control-btn rm-control-btn--captions"
                [class.rm-control-btn--active]="showCaptions()"
                (click)="toggleCaptions()"
                [attr.data-tooltip]="
                  showCaptions() ? 'Turn off captions (C)' : 'Turn on captions (C)'
                "
              >
                @if (showCaptions()) {
                  <!-- Captions ON - solid filled background -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill="currentColor" />
                    <text
                      x="12"
                      y="14.5"
                      text-anchor="middle"
                      font-size="8"
                      font-weight="bold"
                      fill="#000"
                    >
                      CC
                    </text>
                  </svg>
                } @else {
                  <!-- Captions OFF - outline only -->
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <text
                      x="12"
                      y="14.5"
                      text-anchor="middle"
                      font-size="8"
                      font-weight="bold"
                      fill="currentColor"
                    >
                      CC
                    </text>
                  </svg>
                }
              </button>

              <!-- Settings/Quality Button -->
              <div class="rm-settings-container" (clickOutside)="closeSettings()">
                <button
                  class="rm-control-btn rm-control-btn--settings"
                  [class.rm-control-btn--active]="showSettingsMenu()"
                  (click)="toggleSettings()"
                  data-tooltip="Settings"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                    />
                  </svg>
                </button>

                <!-- Settings Menu -->
                @if (showSettingsMenu()) {
                  <div class="rm-settings-menu">
                    <!-- Main Menu -->
                    @if (!currentSettingsPanel()) {
                      <div class="rm-settings-item" (click)="openSettingsPanel('speed')">
                        <span>Playback speed</span>
                        <div class="rm-settings-value">{{ getSpeedLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="openSettingsPanel('quality')">
                        <span>Quality</span>
                        <div class="rm-settings-value">{{ getQualityLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="openSettingsPanel('sleep')">
                        <span>Sleep timer</span>
                        <div class="rm-settings-value">{{ getSleepTimerLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="toggleLoop()">
                        <span>Loop</span>
                        <div class="rm-settings-value">{{ loopEnabled() ? 'On' : 'Off' }}</div>
                      </div>
                    }

                    <!-- Speed Panel -->
                    @if (currentSettingsPanel() === 'speed') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Playback speed</span>
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.25"
                        (click)="setPlaybackSpeed(0.25)"
                      >
                        0.25
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.5"
                        (click)="setPlaybackSpeed(0.5)"
                      >
                        0.5
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.75"
                        (click)="setPlaybackSpeed(0.75)"
                      >
                        0.75
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1"
                        (click)="setPlaybackSpeed(1)"
                      >
                        Normal
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1.25"
                        (click)="setPlaybackSpeed(1.25)"
                      >
                        1.25
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1.5"
                        (click)="setPlaybackSpeed(1.5)"
                      >
                        1.5
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 2"
                        (click)="setPlaybackSpeed(2)"
                      >
                        2
                      </div>
                    }

                    <!-- Quality Panel -->
                    @if (currentSettingsPanel() === 'quality') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Quality</span>
                      </div>
                      <!-- Auto quality option -->
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="currentQuality() === 'auto'"
                        (click)="changeQuality('auto')"
                      >
                        Auto
                      </div>

                      <!-- Dynamic quality options based on video sources -->
                      @for (source of sources(); track source.url) {
                        @if (source.label) {
                          <div
                            class="rm-settings-option"
                            [class.rm-settings-option--active]="currentSource()?.url === source.url"
                            (click)="changeVideoSource(source)"
                          >
                            {{ source.label }}
                          </div>
                        }
                      }
                    }

                    <!-- Sleep Timer Panel -->
                    @if (currentSettingsPanel() === 'sleep') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Sleep timer</span>
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="!sleepTimerActive()"
                        (click)="setSleepTimer(null)"
                      >
                        Off
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 15"
                        (click)="setSleepTimer(15)"
                      >
                        15 minutes
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 30"
                        (click)="setSleepTimer(30)"
                      >
                        30 minutes
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 60"
                        (click)="setSleepTimer(60)"
                      >
                        1 hour
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 90"
                        (click)="setSleepTimer(90)"
                      >
                        1.5 hours
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 120"
                        (click)="setSleepTimer(120)"
                      >
                        2 hours
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- Picture-in-Picture Button -->
              <button
                class="rm-control-btn rm-control-btn--pip"
                (click)="togglePictureInPicture()"
                data-tooltip="Picture-in-picture (I)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"
                  />
                </svg>
              </button>

              <!-- Fullscreen Button -->
              <button
                class="rm-control-btn rm-control-btn--fullscreen"
                (click)="toggleFullscreen()"
                [attr.data-tooltip]="isFullscreen() ? 'Exit fullscreen (F)' : 'Fullscreen (F)'"
              >
                <svg
                  *ngIf="!isFullscreen()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                  />
                </svg>
                <svg
                  *ngIf="isFullscreen()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `, isInline: true, styles: [".rm-video-player{position:relative;display:inline-block;width:100%;max-width:100%;background:linear-gradient(135deg,#000000f2,#141414fa);backdrop-filter:blur(60px) saturate(180%);-webkit-backdrop-filter:blur(60px) saturate(180%);font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,Helvetica Neue,sans-serif;-webkit-user-select:none;user-select:none;overflow:hidden;border-radius:20px;border:.5px solid rgba(255,255,255,.08);box-shadow:0 32px 64px #0009,0 0 0 .5px #ffffff0d,inset 0 1px 1px #ffffff1a,inset 0 0 60px #ffffff05;transition:all .4s cubic-bezier(.23,1,.32,1);cursor:pointer}.rm-video-player:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.03) 0%,transparent 70%),radial-gradient(circle at 70% 70%,rgba(120,119,198,.02) 0%,transparent 70%);border-radius:20px;pointer-events:none}.rm-video-player:hover{border-color:#ffffff1f}.rm-video-player__video{width:100%;height:auto;display:block;outline:none;border-radius:20px;transition:filter .3s cubic-bezier(.23,1,.32,1)}.rm-video-player--loading .rm-video-player__video{filter:brightness(.8) blur(.5px)}.rm-video-player__center-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:radial-gradient(circle,#000000d9,#000000bf);backdrop-filter:blur(40px) saturate(200%);-webkit-backdrop-filter:blur(40px) saturate(200%);border:.5px solid rgba(255,255,255,.18);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:all .4s cubic-bezier(.23,1,.32,1);z-index:5;box-shadow:0 20px 40px #0006,inset 0 1px 1px #fff3,inset 0 0 20px #ffffff0d}.rm-video-player:not(.rm-video-player--playing):hover .rm-video-player__center-play{opacity:1}.rm-video-player__center-play svg{width:28px;height:28px;fill:#fffffff2;margin-left:4px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.4));transition:all .3s cubic-bezier(.23,1,.32,1)}.rm-video-player__center-play:hover{transform:translate(-50%,-50%) scale(1.08);background:radial-gradient(circle,#000000f2,#000000d9);box-shadow:0 30px 60px #0009,inset 0 1px 2px #ffffff4d,inset 0 0 30px #ffffff14}.rm-video-player__center-play:active{transform:translate(-50%,-50%) scale(1.02);transition:all .15s ease}.rm-video-player--fullscreen{position:fixed!important;top:0;left:0;width:100vw!important;height:100vh!important;z-index:9999;border-radius:0;box-shadow:none;transform:none}.rm-video-player--fullscreen .rm-video-player__video{width:100%;height:100%;object-fit:contain;border-radius:0}.rm-video-player__loading,.rm-video-player__error{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:24px;color:#fffffff2;z-index:10;text-align:center;background:linear-gradient(145deg,#000000bf,#000000a6);backdrop-filter:blur(60px) saturate(200%);-webkit-backdrop-filter:blur(60px) saturate(200%);border:.5px solid rgba(255,255,255,.15);border-radius:24px;padding:32px 40px;box-shadow:0 20px 40px #00000080,inset 0 1px 1px #fff3;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif}.rm-video-player__spinner{width:52px;height:52px;border:2.5px solid rgba(255,255,255,.12);border-top:2.5px solid rgba(255,255,255,.85);border-radius:50%;animation:spin 1.4s cubic-bezier(.23,1,.32,1) infinite;filter:drop-shadow(0 4px 12px rgba(0,0,0,.3))}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.rm-video-player__error-icon{font-size:56px;background:linear-gradient(145deg,#ff6b6b,#ff8e8e);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 4px 16px rgba(255,107,107,.4));text-shadow:0 2px 8px rgba(255,107,107,.3)}.rm-video-player__error-message{font-size:17px;font-weight:500;text-align:center;max-width:280px;line-height:1.45;color:#ffffffeb;letter-spacing:-.01em}.rm-video-player__loading span{font-size:17px;font-weight:500;letter-spacing:-.01em;color:#ffffffeb}.rm-video-player__retry-button{padding:14px 28px;background:linear-gradient(145deg,#ffffff1a,#ffffff0f);backdrop-filter:blur(30px) saturate(200%);-webkit-backdrop-filter:blur(30px) saturate(200%);border:.5px solid rgba(255,255,255,.18);color:#fffffff2;border-radius:16px;cursor:pointer;font-weight:600;font-size:16px;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:-.01em;transition:all .4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden;box-shadow:0 8px 20px #0000004d,inset 0 1px 1px #fff3;text-shadow:0 1px 2px rgba(0,0,0,.3)}.rm-video-player__retry-button:hover{background:linear-gradient(145deg,#ffffff26,#ffffff14);border-color:#ffffff40;transform:translateY(-3px);box-shadow:0 16px 40px #0006,inset 0 1px 2px #ffffff4d}.rm-video-player__retry-button:active{transform:translateY(-1px);transition:all .15s ease}.rm-video-player__controls{position:absolute;bottom:0;left:0;right:0;background:transparent;padding:0 8px 2px;opacity:0;transition:all .4s cubic-bezier(.23,1,.32,1);pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;line-height:1}.rm-video-player--controls-visible .rm-video-player__controls{opacity:1;pointer-events:all}.rm-video-player__controls-bottom{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:0;margin-bottom:0;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;line-height:1}.rm-video-player__controls-left,.rm-video-player__controls-right{display:flex;align-items:center;gap:12px;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.rm-control-btn{position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:transparent!important;border:none!important;border-radius:0;color:#ffffffeb;cursor:pointer;transition:transform .2s cubic-bezier(.23,1,.32,1);overflow:visible;font-size:0;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;margin:0;padding:0;line-height:1}.rm-control-btn:before{content:\"\";position:absolute;inset:0;background:#ffffff1a;border-radius:8px;pointer-events:none;opacity:0;transition:opacity .3s cubic-bezier(.23,1,.32,1)}.rm-control-btn:hover{background:transparent;transform:scale(1.02)}.rm-control-btn:hover:before{opacity:1}.rm-control-btn:active{transform:scale(.98);transition:all .15s ease}.rm-control-btn svg{filter:drop-shadow(0 1px 3px rgba(0,0,0,.4));transition:all .3s cubic-bezier(.23,1,.32,1)}.rm-control-btn--play-pause{width:32px;height:32px;background:transparent;margin:0;padding:0;line-height:1}.rm-control-btn--play-pause:hover{background:transparent;transform:scale(1.05)}.rm-control-btn--skip{position:relative;width:30px;height:30px;background:transparent;margin:0;padding:0;line-height:1}.rm-control-btn--skip:hover{background:transparent;transform:scale(1.03)}.rm-control-btn--skip svg{margin-top:-2px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}.rm-control-btn--skip-back:hover,.rm-control-btn--skip-forward:hover{background:transparent}.rm-volume-container{position:relative;display:flex;align-items:center;gap:2px;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible}.rm-volume-slider-container{position:absolute;left:50%;bottom:52px;transform:translate(-50%) rotate(-90deg);opacity:0;pointer-events:none;transition:all .3s cubic-bezier(.23,1,.32,1);background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;z-index:100}.rm-volume-slider-container--visible{opacity:1;pointer-events:all}.rm-volume-slider{width:60px;height:4px;-webkit-appearance:none;background:#000c;border-radius:3px;outline:none;cursor:pointer;border:1px solid rgba(255,255,255,.3);box-shadow:0 2px 8px #0009}.rm-volume-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;background:#fffffff2;border-radius:50%;cursor:pointer;border:2px solid rgba(0,0,0,.3);box-shadow:0 2px 6px #0006;transition:all .2s cubic-bezier(.23,1,.32,1)}.rm-volume-slider::-webkit-slider-thumb:hover{transform:scale(1.05);background:#fff}.rm-time-display{display:flex;align-items:center;gap:2px;margin-left:4px;color:#ffffffeb;font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:.2px;text-shadow:0 1px 3px rgba(0,0,0,.5)}.rm-time-separator{opacity:.6;margin:0 2px}.rm-control-btn--captions,.rm-control-btn--settings{opacity:.8}.rm-control-btn--captions:hover,.rm-control-btn--settings:hover{opacity:1}.rm-control-btn--fullscreen,.rm-control-btn--fullscreen:hover{background:transparent}.rm-settings-container{position:relative}@media (max-width: 320px){.rm-settings-menu{right:-20px;width:180px}}@media (max-width: 280px){.rm-settings-menu{right:-10px;width:160px}}.rm-control-btn--active{background:#007aff33!important;color:#fffffffa!important}.rm-control-btn[data-tooltip]:hover:after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);background:#000000f2;color:#fffffffa;padding:8px 12px;border-radius:8px;font-size:11px;font-weight:500;white-space:nowrap;z-index:10000;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:-.01em;border:.5px solid rgba(255,255,255,.15);box-shadow:0 8px 32px #0009,0 2px 8px #0006,inset 0 1px 1px #ffffff26;animation:tooltipFadeIn .2s cubic-bezier(.23,1,.32,1);max-width:200px;text-align:center}.rm-control-btn[data-tooltip]{position:relative}.rm-video-player__controls-left .rm-control-btn[data-tooltip]:hover:after{margin-left:15px}.rm-video-player__controls-right .rm-control-btn[data-tooltip]:hover:after{margin-right:15px}.rm-control-btn[data-tooltip]:hover:before{content:\"\";position:absolute;bottom:calc(100% + 2px);left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(0,0,0,.95);z-index:10001;pointer-events:none}@keyframes tooltipFadeIn{0%{opacity:0;transform:translate(-50%) translateY(-4px)}to{opacity:1;transform:translate(-50%) translateY(0)}}.rm-settings-menu{position:absolute;bottom:40px;right:-10px;width:200px;max-width:calc(100vw - 20px);max-height:280px;background:#000000e6;border-radius:8px;box-shadow:0 4px 20px #000c;overflow:hidden;z-index:1000;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;font-size:14px;color:#fff}@keyframes settingsSlideIn{0%{opacity:0;transform:translateY(10px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.rm-settings-item{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.1);transition:background-color .2s}.rm-settings-item:hover{background-color:#ffffff1a}.rm-settings-item:last-child{border-bottom:none}.rm-settings-value{font-size:13px;color:#ffffffb3;margin-right:8px}.rm-settings-arrow{width:16px;height:16px;opacity:.7}.rm-settings-header{display:flex;align-items:center;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.1);font-weight:500}.rm-settings-back{background:none;border:none;color:#fff;cursor:pointer;margin-right:12px;padding:4px;border-radius:4px;transition:background-color .2s}.rm-settings-back:hover{background-color:#ffffff1a}.rm-settings-back svg{width:16px;height:16px}.rm-settings-option{display:flex;align-items:center;padding:10px 16px;cursor:pointer;transition:background-color .2s;position:relative}.rm-settings-option:hover{background-color:#ffffff1a}.rm-settings-option--active{background-color:#fff3}.rm-settings-option--active:after{content:\"\\2713\";position:absolute;right:16px;font-size:14px;color:#fff}.rm-video-player--fullscreen .rm-video-player__controls{padding:0 16px 3px;border-radius:0}video::cue{background-color:#000c;color:#fff;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;font-size:16px;font-weight:500;line-height:1.4;padding:4px 8px;border-radius:4px;text-shadow:1px 1px 2px rgba(0,0,0,.8)}.rm-video-player--fullscreen video::cue{font-size:20px;padding:6px 12px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: VideoProgressComponent, selector: "rm-video-progress", inputs: ["currentTime", "duration", "buffered"], outputs: ["seek"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: RmNgVideoPlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'rm-ng-video-player', standalone: true, imports: [CommonModule, VideoProgressComponent], template: `
    <div
      class="rm-video-player"
      [class.rm-video-player--fullscreen]="isFullscreen()"
      [class.rm-video-player--loading]="isLoading()"
      [class.rm-video-player--error]="hasError()"
      [class.rm-video-player--controls-visible]="showControls()"
      [class.rm-video-player--playing]="isPlaying()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <!-- Apple-style center play button -->
      @if (!isLoading() && !hasError() && !isPlaying()) {
        <div class="rm-video-player__center-play" (click)="togglePlayPause()">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path d="M2 2L22 14L2 26V2Z" fill="currentColor" />
          </svg>
        </div>
      }

      <video
        #videoElement
        class="rm-video-player__video"
        [src]="currentSource()?.url"
        [poster]="config().poster"
        [muted]="isMuted()"
        [loop]="loopEnabled()"
        [autoplay]="config().autoplay"
        [attr.playsinline]="config().playsinline"
        [preload]="config().preload"
        (loadstart)="onLoadStart()"
        (loadedmetadata)="onLoadedMetadata()"
        (loadeddata)="onLoadedData()"
        (canplay)="onCanPlay()"
        (canplaythrough)="onCanPlayThrough()"
        (play)="onPlay()"
        (pause)="onPause()"
        (ended)="onEnded()"
        (timeupdate)="onTimeUpdate()"
        (progress)="onProgress()"
        (volumechange)="onVolumeChange()"
        (error)="onError($event)"
        (click)="togglePlayPause()"
      >
        @if (sources().length > 0) {
          @for (source of sources(); track source.url) {
            <source [src]="source.url" [type]="source.type" />
          }
        }

        @if (config().tracks && config().tracks!.length > 0) {
          @for (track of config().tracks!; track track.src) {
            <track
              [src]="track.src"
              [kind]="track.kind"
              [srclang]="track.srclang"
              [label]="track.label"
              [default]="track.default"
            />
          }
        }

        Your browser does not support the video tag.
      </video>

      @if (isLoading()) {
        <div class="rm-video-player__loading">
          <div class="rm-video-player__spinner"></div>
          <span>Loading...</span>
        </div>
      }

      @if (hasError()) {
        <div class="rm-video-player__error">
          <div class="rm-video-player__error-icon">⚠</div>
          <div class="rm-video-player__error-message">
            {{ errorMessage() }}
          </div>
          @if (config().showRetryButton) {
            <button class="rm-video-player__retry-button" (click)="retry()">Retry</button>
          }
        </div>
      }

      @if (showControls() && !hasError()) {
        <div class="rm-video-player__controls">
          <!-- Progress Bar (YouTube sequence 1) -->
          <rm-video-progress
            [currentTime]="currentTime()"
            [duration]="duration()"
            [buffered]="bufferedRanges()"
            (seek)="seek($event)"
          >
          </rm-video-progress>

          <div class="rm-video-player__controls-bottom">
            <!-- Left Controls Group (YouTube sequence 2) -->
            <div class="rm-video-player__controls-left">
              <!-- Play/Pause Button -->
              <button
                class="rm-control-btn rm-control-btn--play-pause"
                (click)="togglePlayPause()"
                [attr.data-tooltip]="isPlaying() ? 'Pause (Space)' : 'Play (Space)'"
              >
                <svg
                  *ngIf="!isPlaying()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <svg
                  *ngIf="isPlaying()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>

              <!-- Skip Backward 10s -->
              <button
                class="rm-control-btn rm-control-btn--skip rm-control-btn--skip-back"
                (click)="skipBackward()"
                data-tooltip="Skip backward 10s (J)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <!-- Curved arrow pointing left with replay symbol -->
                  <path
                    d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"
                  />
                  <!-- Double left arrows -->
                  <path d="M11 18V6l-2.5 6L11 18zm-4 0V6l-2.5 6L7 18z" />
                </svg>
              </button>

              <!-- Skip Forward 10s -->
              <button
                class="rm-control-btn rm-control-btn--skip rm-control-btn--skip-forward"
                (click)="skipForward()"
                data-tooltip="Skip forward 10s (L)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <!-- Curved arrow pointing right with forward symbol -->
                  <path
                    d="M12,5V1l5,5l-5,5V7c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6h2c0,4.42-3.58,8-8,8s-8-3.58-8-8S7.58,5,12,5z"
                  />
                  <!-- Double right arrows -->
                  <path d="M13 6v12l2.5-6L13 6zm4 0v12l2.5-6L17 6z" />
                </svg>
              </button>

              <!-- Volume Controls -->
              <div
                class="rm-volume-container"
                (mouseenter)="showVolumeSlider.set(true)"
                (mouseleave)="showVolumeSlider.set(false)"
              >
                <button
                  class="rm-control-btn rm-control-btn--volume"
                  (click)="toggleMute()"
                  [attr.data-tooltip]="isMuted() ? 'Unmute (M)' : 'Mute (M)'"
                >
                  <svg
                    *ngIf="!isMuted() && volume() > 0.5"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                    />
                  </svg>
                  <svg
                    *ngIf="!isMuted() && volume() <= 0.5 && volume() > 0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"
                    />
                  </svg>
                  <svg
                    *ngIf="isMuted() || volume() === 0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                    />
                  </svg>
                </button>
                <div
                  class="rm-volume-slider-container"
                  [class.rm-volume-slider-container--visible]="showVolumeSlider()"
                >
                  <input
                    type="range"
                    class="rm-volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    [value]="volume()"
                    (input)="setVolume(+$any($event.target).value)"
                  />
                </div>
              </div>

              <!-- Time Display -->
              <div class="rm-time-display">
                <span class="rm-time-current">{{ formatTime(currentTime()) }}</span>
                <span class="rm-time-separator">/</span>
                <span class="rm-time-duration">{{ formatTime(duration()) }}</span>
              </div>
            </div>

            <!-- Right Controls Group (YouTube sequence 3) -->
            <div class="rm-video-player__controls-right">
              <!-- Captions/Subtitles Button -->
              <button
                class="rm-control-btn rm-control-btn--captions"
                [class.rm-control-btn--active]="showCaptions()"
                (click)="toggleCaptions()"
                [attr.data-tooltip]="
                  showCaptions() ? 'Turn off captions (C)' : 'Turn on captions (C)'
                "
              >
                @if (showCaptions()) {
                  <!-- Captions ON - solid filled background -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill="currentColor" />
                    <text
                      x="12"
                      y="14.5"
                      text-anchor="middle"
                      font-size="8"
                      font-weight="bold"
                      fill="#000"
                    >
                      CC
                    </text>
                  </svg>
                } @else {
                  <!-- Captions OFF - outline only -->
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <text
                      x="12"
                      y="14.5"
                      text-anchor="middle"
                      font-size="8"
                      font-weight="bold"
                      fill="currentColor"
                    >
                      CC
                    </text>
                  </svg>
                }
              </button>

              <!-- Settings/Quality Button -->
              <div class="rm-settings-container" (clickOutside)="closeSettings()">
                <button
                  class="rm-control-btn rm-control-btn--settings"
                  [class.rm-control-btn--active]="showSettingsMenu()"
                  (click)="toggleSettings()"
                  data-tooltip="Settings"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                    />
                  </svg>
                </button>

                <!-- Settings Menu -->
                @if (showSettingsMenu()) {
                  <div class="rm-settings-menu">
                    <!-- Main Menu -->
                    @if (!currentSettingsPanel()) {
                      <div class="rm-settings-item" (click)="openSettingsPanel('speed')">
                        <span>Playback speed</span>
                        <div class="rm-settings-value">{{ getSpeedLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="openSettingsPanel('quality')">
                        <span>Quality</span>
                        <div class="rm-settings-value">{{ getQualityLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="openSettingsPanel('sleep')">
                        <span>Sleep timer</span>
                        <div class="rm-settings-value">{{ getSleepTimerLabel() }}</div>
                        <svg class="rm-settings-arrow" width="16" height="16" viewBox="0 0 24 24">
                          <path
                            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div class="rm-settings-item" (click)="toggleLoop()">
                        <span>Loop</span>
                        <div class="rm-settings-value">{{ loopEnabled() ? 'On' : 'Off' }}</div>
                      </div>
                    }

                    <!-- Speed Panel -->
                    @if (currentSettingsPanel() === 'speed') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Playback speed</span>
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.25"
                        (click)="setPlaybackSpeed(0.25)"
                      >
                        0.25
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.5"
                        (click)="setPlaybackSpeed(0.5)"
                      >
                        0.5
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 0.75"
                        (click)="setPlaybackSpeed(0.75)"
                      >
                        0.75
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1"
                        (click)="setPlaybackSpeed(1)"
                      >
                        Normal
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1.25"
                        (click)="setPlaybackSpeed(1.25)"
                      >
                        1.25
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 1.5"
                        (click)="setPlaybackSpeed(1.5)"
                      >
                        1.5
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="playbackSpeed() === 2"
                        (click)="setPlaybackSpeed(2)"
                      >
                        2
                      </div>
                    }

                    <!-- Quality Panel -->
                    @if (currentSettingsPanel() === 'quality') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Quality</span>
                      </div>
                      <!-- Auto quality option -->
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="currentQuality() === 'auto'"
                        (click)="changeQuality('auto')"
                      >
                        Auto
                      </div>

                      <!-- Dynamic quality options based on video sources -->
                      @for (source of sources(); track source.url) {
                        @if (source.label) {
                          <div
                            class="rm-settings-option"
                            [class.rm-settings-option--active]="currentSource()?.url === source.url"
                            (click)="changeVideoSource(source)"
                          >
                            {{ source.label }}
                          </div>
                        }
                      }
                    }

                    <!-- Sleep Timer Panel -->
                    @if (currentSettingsPanel() === 'sleep') {
                      <div class="rm-settings-header">
                        <button class="rm-settings-back" (click)="closeSettingsPanel()">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path
                              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <span>Sleep timer</span>
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="!sleepTimerActive()"
                        (click)="setSleepTimer(null)"
                      >
                        Off
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 15"
                        (click)="setSleepTimer(15)"
                      >
                        15 minutes
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 30"
                        (click)="setSleepTimer(30)"
                      >
                        30 minutes
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 60"
                        (click)="setSleepTimer(60)"
                      >
                        1 hour
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 90"
                        (click)="setSleepTimer(90)"
                      >
                        1.5 hours
                      </div>
                      <div
                        class="rm-settings-option"
                        [class.rm-settings-option--active]="sleepTimer() === 120"
                        (click)="setSleepTimer(120)"
                      >
                        2 hours
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- Picture-in-Picture Button -->
              <button
                class="rm-control-btn rm-control-btn--pip"
                (click)="togglePictureInPicture()"
                data-tooltip="Picture-in-picture (I)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"
                  />
                </svg>
              </button>

              <!-- Fullscreen Button -->
              <button
                class="rm-control-btn rm-control-btn--fullscreen"
                (click)="toggleFullscreen()"
                [attr.data-tooltip]="isFullscreen() ? 'Exit fullscreen (F)' : 'Fullscreen (F)'"
              >
                <svg
                  *ngIf="!isFullscreen()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                  />
                </svg>
                <svg
                  *ngIf="isFullscreen()"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".rm-video-player{position:relative;display:inline-block;width:100%;max-width:100%;background:linear-gradient(135deg,#000000f2,#141414fa);backdrop-filter:blur(60px) saturate(180%);-webkit-backdrop-filter:blur(60px) saturate(180%);font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,Helvetica Neue,sans-serif;-webkit-user-select:none;user-select:none;overflow:hidden;border-radius:20px;border:.5px solid rgba(255,255,255,.08);box-shadow:0 32px 64px #0009,0 0 0 .5px #ffffff0d,inset 0 1px 1px #ffffff1a,inset 0 0 60px #ffffff05;transition:all .4s cubic-bezier(.23,1,.32,1);cursor:pointer}.rm-video-player:before{content:\"\";position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.03) 0%,transparent 70%),radial-gradient(circle at 70% 70%,rgba(120,119,198,.02) 0%,transparent 70%);border-radius:20px;pointer-events:none}.rm-video-player:hover{border-color:#ffffff1f}.rm-video-player__video{width:100%;height:auto;display:block;outline:none;border-radius:20px;transition:filter .3s cubic-bezier(.23,1,.32,1)}.rm-video-player--loading .rm-video-player__video{filter:brightness(.8) blur(.5px)}.rm-video-player__center-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;background:radial-gradient(circle,#000000d9,#000000bf);backdrop-filter:blur(40px) saturate(200%);-webkit-backdrop-filter:blur(40px) saturate(200%);border:.5px solid rgba(255,255,255,.18);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:all .4s cubic-bezier(.23,1,.32,1);z-index:5;box-shadow:0 20px 40px #0006,inset 0 1px 1px #fff3,inset 0 0 20px #ffffff0d}.rm-video-player:not(.rm-video-player--playing):hover .rm-video-player__center-play{opacity:1}.rm-video-player__center-play svg{width:28px;height:28px;fill:#fffffff2;margin-left:4px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.4));transition:all .3s cubic-bezier(.23,1,.32,1)}.rm-video-player__center-play:hover{transform:translate(-50%,-50%) scale(1.08);background:radial-gradient(circle,#000000f2,#000000d9);box-shadow:0 30px 60px #0009,inset 0 1px 2px #ffffff4d,inset 0 0 30px #ffffff14}.rm-video-player__center-play:active{transform:translate(-50%,-50%) scale(1.02);transition:all .15s ease}.rm-video-player--fullscreen{position:fixed!important;top:0;left:0;width:100vw!important;height:100vh!important;z-index:9999;border-radius:0;box-shadow:none;transform:none}.rm-video-player--fullscreen .rm-video-player__video{width:100%;height:100%;object-fit:contain;border-radius:0}.rm-video-player__loading,.rm-video-player__error{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:24px;color:#fffffff2;z-index:10;text-align:center;background:linear-gradient(145deg,#000000bf,#000000a6);backdrop-filter:blur(60px) saturate(200%);-webkit-backdrop-filter:blur(60px) saturate(200%);border:.5px solid rgba(255,255,255,.15);border-radius:24px;padding:32px 40px;box-shadow:0 20px 40px #00000080,inset 0 1px 1px #fff3;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif}.rm-video-player__spinner{width:52px;height:52px;border:2.5px solid rgba(255,255,255,.12);border-top:2.5px solid rgba(255,255,255,.85);border-radius:50%;animation:spin 1.4s cubic-bezier(.23,1,.32,1) infinite;filter:drop-shadow(0 4px 12px rgba(0,0,0,.3))}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.rm-video-player__error-icon{font-size:56px;background:linear-gradient(145deg,#ff6b6b,#ff8e8e);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 4px 16px rgba(255,107,107,.4));text-shadow:0 2px 8px rgba(255,107,107,.3)}.rm-video-player__error-message{font-size:17px;font-weight:500;text-align:center;max-width:280px;line-height:1.45;color:#ffffffeb;letter-spacing:-.01em}.rm-video-player__loading span{font-size:17px;font-weight:500;letter-spacing:-.01em;color:#ffffffeb}.rm-video-player__retry-button{padding:14px 28px;background:linear-gradient(145deg,#ffffff1a,#ffffff0f);backdrop-filter:blur(30px) saturate(200%);-webkit-backdrop-filter:blur(30px) saturate(200%);border:.5px solid rgba(255,255,255,.18);color:#fffffff2;border-radius:16px;cursor:pointer;font-weight:600;font-size:16px;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:-.01em;transition:all .4s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden;box-shadow:0 8px 20px #0000004d,inset 0 1px 1px #fff3;text-shadow:0 1px 2px rgba(0,0,0,.3)}.rm-video-player__retry-button:hover{background:linear-gradient(145deg,#ffffff26,#ffffff14);border-color:#ffffff40;transform:translateY(-3px);box-shadow:0 16px 40px #0006,inset 0 1px 2px #ffffff4d}.rm-video-player__retry-button:active{transform:translateY(-1px);transition:all .15s ease}.rm-video-player__controls{position:absolute;bottom:0;left:0;right:0;background:transparent;padding:0 8px 2px;opacity:0;transition:all .4s cubic-bezier(.23,1,.32,1);pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;line-height:1}.rm-video-player--controls-visible .rm-video-player__controls{opacity:1;pointer-events:all}.rm-video-player__controls-bottom{display:flex;align-items:center;justify-content:space-between;gap:4px;margin-top:0;margin-bottom:0;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;line-height:1}.rm-video-player__controls-left,.rm-video-player__controls-right{display:flex;align-items:center;gap:12px;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.rm-control-btn{position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:transparent!important;border:none!important;border-radius:0;color:#ffffffeb;cursor:pointer;transition:transform .2s cubic-bezier(.23,1,.32,1);overflow:visible;font-size:0;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;margin:0;padding:0;line-height:1}.rm-control-btn:before{content:\"\";position:absolute;inset:0;background:#ffffff1a;border-radius:8px;pointer-events:none;opacity:0;transition:opacity .3s cubic-bezier(.23,1,.32,1)}.rm-control-btn:hover{background:transparent;transform:scale(1.02)}.rm-control-btn:hover:before{opacity:1}.rm-control-btn:active{transform:scale(.98);transition:all .15s ease}.rm-control-btn svg{filter:drop-shadow(0 1px 3px rgba(0,0,0,.4));transition:all .3s cubic-bezier(.23,1,.32,1)}.rm-control-btn--play-pause{width:32px;height:32px;background:transparent;margin:0;padding:0;line-height:1}.rm-control-btn--play-pause:hover{background:transparent;transform:scale(1.05)}.rm-control-btn--skip{position:relative;width:30px;height:30px;background:transparent;margin:0;padding:0;line-height:1}.rm-control-btn--skip:hover{background:transparent;transform:scale(1.03)}.rm-control-btn--skip svg{margin-top:-2px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}.rm-control-btn--skip-back:hover,.rm-control-btn--skip-forward:hover{background:transparent}.rm-volume-container{position:relative;display:flex;align-items:center;gap:2px;background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible}.rm-volume-slider-container{position:absolute;left:50%;bottom:52px;transform:translate(-50%) rotate(-90deg);opacity:0;pointer-events:none;transition:all .3s cubic-bezier(.23,1,.32,1);background:transparent!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;z-index:100}.rm-volume-slider-container--visible{opacity:1;pointer-events:all}.rm-volume-slider{width:60px;height:4px;-webkit-appearance:none;background:#000c;border-radius:3px;outline:none;cursor:pointer;border:1px solid rgba(255,255,255,.3);box-shadow:0 2px 8px #0009}.rm-volume-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;background:#fffffff2;border-radius:50%;cursor:pointer;border:2px solid rgba(0,0,0,.3);box-shadow:0 2px 6px #0006;transition:all .2s cubic-bezier(.23,1,.32,1)}.rm-volume-slider::-webkit-slider-thumb:hover{transform:scale(1.05);background:#fff}.rm-time-display{display:flex;align-items:center;gap:2px;margin-left:4px;color:#ffffffeb;font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:.2px;text-shadow:0 1px 3px rgba(0,0,0,.5)}.rm-time-separator{opacity:.6;margin:0 2px}.rm-control-btn--captions,.rm-control-btn--settings{opacity:.8}.rm-control-btn--captions:hover,.rm-control-btn--settings:hover{opacity:1}.rm-control-btn--fullscreen,.rm-control-btn--fullscreen:hover{background:transparent}.rm-settings-container{position:relative}@media (max-width: 320px){.rm-settings-menu{right:-20px;width:180px}}@media (max-width: 280px){.rm-settings-menu{right:-10px;width:160px}}.rm-control-btn--active{background:#007aff33!important;color:#fffffffa!important}.rm-control-btn[data-tooltip]:hover:after{content:attr(data-tooltip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%);background:#000000f2;color:#fffffffa;padding:8px 12px;border-radius:8px;font-size:11px;font-weight:500;white-space:nowrap;z-index:10000;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;letter-spacing:-.01em;border:.5px solid rgba(255,255,255,.15);box-shadow:0 8px 32px #0009,0 2px 8px #0006,inset 0 1px 1px #ffffff26;animation:tooltipFadeIn .2s cubic-bezier(.23,1,.32,1);max-width:200px;text-align:center}.rm-control-btn[data-tooltip]{position:relative}.rm-video-player__controls-left .rm-control-btn[data-tooltip]:hover:after{margin-left:15px}.rm-video-player__controls-right .rm-control-btn[data-tooltip]:hover:after{margin-right:15px}.rm-control-btn[data-tooltip]:hover:before{content:\"\";position:absolute;bottom:calc(100% + 2px);left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(0,0,0,.95);z-index:10001;pointer-events:none}@keyframes tooltipFadeIn{0%{opacity:0;transform:translate(-50%) translateY(-4px)}to{opacity:1;transform:translate(-50%) translateY(0)}}.rm-settings-menu{position:absolute;bottom:40px;right:-10px;width:200px;max-width:calc(100vw - 20px);max-height:280px;background:#000000e6;border-radius:8px;box-shadow:0 4px 20px #000c;overflow:hidden;z-index:1000;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;font-size:14px;color:#fff}@keyframes settingsSlideIn{0%{opacity:0;transform:translateY(10px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.rm-settings-item{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.1);transition:background-color .2s}.rm-settings-item:hover{background-color:#ffffff1a}.rm-settings-item:last-child{border-bottom:none}.rm-settings-value{font-size:13px;color:#ffffffb3;margin-right:8px}.rm-settings-arrow{width:16px;height:16px;opacity:.7}.rm-settings-header{display:flex;align-items:center;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.1);font-weight:500}.rm-settings-back{background:none;border:none;color:#fff;cursor:pointer;margin-right:12px;padding:4px;border-radius:4px;transition:background-color .2s}.rm-settings-back:hover{background-color:#ffffff1a}.rm-settings-back svg{width:16px;height:16px}.rm-settings-option{display:flex;align-items:center;padding:10px 16px;cursor:pointer;transition:background-color .2s;position:relative}.rm-settings-option:hover{background-color:#ffffff1a}.rm-settings-option--active{background-color:#fff3}.rm-settings-option--active:after{content:\"\\2713\";position:absolute;right:16px;font-size:14px;color:#fff}.rm-video-player--fullscreen .rm-video-player__controls{padding:0 16px 3px;border-radius:0}video::cue{background-color:#000c;color:#fff;font-family:-apple-system,BlinkMacSystemFont,SF Pro Display,system-ui,sans-serif;font-size:16px;font-weight:500;line-height:1.4;padding:4px 8px;border-radius:4px;text-shadow:1px 1px 2px rgba(0,0,0,.8)}.rm-video-player--fullscreen video::cue{font-size:20px;padding:6px 12px}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { videoElement: [{
                type: ViewChild,
                args: ['videoElement', { static: true }]
            }], videoConfig: [{
                type: Input
            }], videoSources: [{
                type: Input
            }], playerEvent: [{
                type: Output
            }], stateChange: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class VideoPlayerService {
    destroyRef = inject(DestroyRef);
    // Analytics tracking
    analytics = signal({
        playCount: 0,
        totalWatchTime: 0,
        averageWatchTime: 0,
        completionRate: 0,
        bufferingEvents: 0,
        errorEvents: 0,
        seekEvents: 0,
        qualityChanges: 0,
    }, ...(ngDevMode ? [{ debugName: "analytics" }] : []));
    // Global player instances tracking
    playerInstances = new Map();
    activePlayer = signal(null, ...(ngDevMode ? [{ debugName: "activePlayer" }] : []));
    // Network and performance monitoring
    networkStatus = signal('online', ...(ngDevMode ? [{ debugName: "networkStatus" }] : []));
    connectionSpeed = signal('unknown', ...(ngDevMode ? [{ debugName: "connectionSpeed" }] : []));
    // Picture-in-Picture support
    pipSupported = signal(false, ...(ngDevMode ? [{ debugName: "pipSupported" }] : []));
    pipActive = signal(false, ...(ngDevMode ? [{ debugName: "pipActive" }] : []));
    constructor() {
        this.initializeNetworkMonitoring();
        this.initializePictureInPictureSupport();
    }
    /**
     * Register a video player instance
     */
    registerPlayer(id, playerRef) {
        this.playerInstances.set(id, playerRef);
    }
    /**
     * Unregister a video player instance
     */
    unregisterPlayer(id) {
        this.playerInstances.delete(id);
        if (this.activePlayer() === id) {
            this.activePlayer.set(null);
        }
    }
    /**
     * Set the active player
     */
    setActivePlayer(id) {
        if (this.playerInstances.has(id)) {
            this.activePlayer.set(id);
        }
    }
    /**
     * Get analytics data
     */
    getAnalytics() {
        return this.analytics();
    }
    /**
     * Update analytics with new data
     */
    updateAnalytics(update) {
        this.analytics.update(current => ({ ...current, ...update }));
    }
    /**
     * Track video event for analytics
     */
    trackEvent(event, playerId) {
        const currentAnalytics = this.analytics();
        switch (event.type) {
            case 'play':
                this.analytics.update(a => ({
                    ...a,
                    playCount: a.playCount + 1,
                }));
                break;
            case 'error':
                this.analytics.update(a => ({
                    ...a,
                    errorEvents: a.errorEvents + 1,
                }));
                break;
            case 'seek':
                this.analytics.update(a => ({
                    ...a,
                    seekEvents: a.seekEvents + 1,
                }));
                break;
            case 'bufferstart':
                this.analytics.update(a => ({
                    ...a,
                    bufferingEvents: a.bufferingEvents + 1,
                }));
                break;
            case 'qualitychange':
                this.analytics.update(a => ({
                    ...a,
                    qualityChanges: a.qualityChanges + 1,
                }));
                break;
        }
    }
    /**
     * Get optimal video quality based on network conditions
     */
    getOptimalQuality(availableQualities) {
        if (availableQualities.length === 0)
            return null;
        const connectionSpeed = this.connectionSpeed();
        const networkStatus = this.networkStatus();
        if (networkStatus === 'offline') {
            return null;
        }
        // Sort qualities by height (resolution)
        const sortedQualities = [...availableQualities].sort((a, b) => b.height - a.height);
        switch (connectionSpeed) {
            case 'slow':
                // Return lowest quality for slow connections
                return sortedQualities[sortedQualities.length - 1];
            case 'fast':
                // Return highest quality for fast connections
                return sortedQualities[0];
            default:
                // Return medium quality or best available
                const mediumIndex = Math.floor(sortedQualities.length / 2);
                return sortedQualities[mediumIndex] || sortedQualities[0];
        }
    }
    /**
     * Generate adaptive streaming manifest
     */
    generateAdaptiveManifest(sources) {
        if (sources.length === 0)
            return null;
        // Simple HLS-style manifest generation
        const manifest = sources
            .map(source => `#EXT-X-STREAM-INF:BANDWIDTH=1000000\n${source.url}`)
            .join('\n');
        return `#EXTM3U\n#EXT-X-VERSION:3\n${manifest}`;
    }
    /**
     * Prefetch video segments for smoother playback
     */
    prefetchSegments(videoUrl, segmentCount = 3) {
        const prefetchPromises = [];
        for (let i = 0; i < segmentCount; i++) {
            const segmentUrl = `${videoUrl}?segment=${i}`;
            const prefetchPromise = fetch(segmentUrl, {
                method: 'HEAD',
                cache: 'force-cache',
            }).then(() => void 0);
            prefetchPromises.push(prefetchPromise);
        }
        return Promise.all(prefetchPromises);
    }
    /**
     * Picture-in-Picture support
     */
    isPictureInPictureSupported() {
        return this.pipSupported();
    }
    isPictureInPictureActive() {
        return this.pipActive();
    }
    async enterPictureInPicture(videoElement) {
        if (!this.pipSupported()) {
            throw new Error('Picture-in-Picture is not supported');
        }
        try {
            await videoElement.requestPictureInPicture();
            this.pipActive.set(true);
        }
        catch (error) {
            console.error('Failed to enter Picture-in-Picture:', error);
            throw error;
        }
    }
    async exitPictureInPicture() {
        try {
            await document.exitPictureInPicture();
            this.pipActive.set(false);
        }
        catch (error) {
            console.error('Failed to exit Picture-in-Picture:', error);
            throw error;
        }
    }
    /**
     * Memory optimization utilities
     */
    cleanupUnusedResources() {
        // Clean up inactive player instances
        const activeId = this.activePlayer();
        this.playerInstances.forEach((player, id) => {
            if (id !== activeId && player.cleanup) {
                player.cleanup();
            }
        });
    }
    /**
     * Performance monitoring
     */
    measurePerformance(operation, fn) {
        const startTime = performance.now();
        const result = fn();
        const endTime = performance.now();
        console.log(`Performance: ${operation} took ${endTime - startTime} milliseconds`);
        return result;
    }
    /**
     * Detect if device supports hardware acceleration
     */
    detectHardwareAcceleration() {
        return new Promise(resolve => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl');
            if (!gl) {
                resolve(false);
                return;
            }
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                const isHardwareAccelerated = !renderer.includes('SwiftShader') && !renderer.includes('Software');
                resolve(isHardwareAccelerated);
            }
            else {
                resolve(true); // Assume hardware acceleration if we can't detect
            }
            canvas.remove();
        });
    }
    initializeNetworkMonitoring() {
        // Monitor online/offline status
        merge(fromEvent(window, 'online').pipe(map(() => 'online')), fromEvent(window, 'offline').pipe(map(() => 'offline')))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(status => {
            this.networkStatus.set(status);
        });
        // Estimate connection speed
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection) {
                const updateConnectionSpeed = () => {
                    const effectiveType = connection.effectiveType;
                    if (effectiveType === '4g') {
                        this.connectionSpeed.set('fast');
                    }
                    else if (effectiveType === '3g' || effectiveType === '2g') {
                        this.connectionSpeed.set('slow');
                    }
                    else {
                        this.connectionSpeed.set('unknown');
                    }
                };
                updateConnectionSpeed();
                connection.addEventListener('change', updateConnectionSpeed);
            }
        }
    }
    initializePictureInPictureSupport() {
        this.pipSupported.set('pictureInPictureEnabled' in document);
        if (this.pipSupported()) {
            fromEvent(document, 'enterpictureinpicture')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.pipActive.set(true));
            fromEvent(document, 'leavepictureinpicture')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.pipActive.set(false));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: VideoPlayerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: VideoPlayerService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.0.0-next.6", ngImport: i0, type: VideoPlayerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/*
 * Public API Surface of rm-ng-video-player
 */
// Main component

/**
 * Generated bundle index. Do not edit.
 */

export { RmNgVideoPlayerComponent, VideoPlayerService, VideoProgressComponent };
//# sourceMappingURL=codewithrajat-rm-ng-video-player.mjs.map
