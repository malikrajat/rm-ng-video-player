import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy, ElementRef, EventEmitter } from '@angular/core';

interface VideoSource {
    url: string;
    type: string;
    quality?: string;
    label?: string;
}
interface VideoTrack {
    src: string;
    kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
    srclang?: string;
    label?: string;
    default?: boolean;
}
interface VideoPlayerConfig {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    playsinline: boolean;
    preload: 'none' | 'metadata' | 'auto';
    poster?: string;
    replayOnEnd?: boolean;
    showControls: boolean;
    showFullscreenButton: boolean;
    showVolumeButton: boolean;
    showProgressBar: boolean;
    showRetryButton: boolean;
    hideControlsDelay: number;
    seekStep: number;
    volumeStep: number;
    tracks?: VideoTrack[];
    theme?: 'default' | 'dark' | 'light' | 'custom';
    customColors?: {
        primary?: string;
        secondary?: string;
        background?: string;
        text?: string;
    };
}
interface VideoPlayerState {
    isPlaying: boolean;
    isLoading: boolean;
    hasError: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isFullscreen: boolean;
    bufferedRanges: TimeRanges | null;
}
interface VideoPlayerEvent {
    type: string;
    data?: any;
    timestamp: number;
}
interface BufferedRange {
    start: number;
    end: number;
}
interface VideoQuality {
    label: string;
    height: number;
    bitrate?: number;
    url: string;
}
interface VideoPlayerAnalytics {
    playCount: number;
    totalWatchTime: number;
    averageWatchTime: number;
    completionRate: number;
    bufferingEvents: number;
    errorEvents: number;
    seekEvents: number;
    qualityChanges: number;
}
interface VideoPlayerOptions {
    enableAnalytics?: boolean;
    enableKeyboardShortcuts?: boolean;
    enableGestures?: boolean;
    enablePictureInPicture?: boolean;
    enableAirPlay?: boolean;
    enableChromecast?: boolean;
    autoHideControls?: boolean;
    doubleClickDelay?: number;
    seekPreviewThumbnails?: boolean;
}
type VideoPlayerEventType = 'loadstart' | 'loadedmetadata' | 'loadeddata' | 'canplay' | 'canplaythrough' | 'play' | 'pause' | 'ended' | 'timeupdate' | 'progress' | 'volumechange' | 'error' | 'fullscreenchange' | 'qualitychange' | 'seek' | 'bufferstart' | 'bufferend';

declare class RmNgVideoPlayerComponent implements OnInit, OnDestroy {
    private elementRef;
    videoElement: ElementRef<HTMLVideoElement>;
    private destroyRef;
    set videoConfig(config: Partial<VideoPlayerConfig>);
    set videoSources(sources: VideoSource[]);
    playerEvent: EventEmitter<VideoPlayerEvent>;
    stateChange: EventEmitter<VideoPlayerState>;
    config: _angular_core.WritableSignal<VideoPlayerConfig>;
    sources: _angular_core.WritableSignal<VideoSource[]>;
    currentSource: _angular_core.WritableSignal<VideoSource | null>;
    isPlaying: _angular_core.WritableSignal<boolean>;
    isLoading: _angular_core.WritableSignal<boolean>;
    hasError: _angular_core.WritableSignal<boolean>;
    errorMessage: _angular_core.WritableSignal<string>;
    currentTime: _angular_core.WritableSignal<number>;
    duration: _angular_core.WritableSignal<number>;
    volume: _angular_core.WritableSignal<number>;
    isMuted: _angular_core.WritableSignal<boolean>;
    isFullscreen: _angular_core.WritableSignal<boolean>;
    bufferedRanges: _angular_core.WritableSignal<TimeRanges | null>;
    playbackSpeed: _angular_core.WritableSignal<number>;
    showControls: _angular_core.WritableSignal<boolean>;
    showVolumeSlider: _angular_core.WritableSignal<boolean>;
    showCaptions: _angular_core.WritableSignal<boolean>;
    showSettingsMenu: _angular_core.WritableSignal<boolean>;
    currentSettingsPanel: _angular_core.WritableSignal<string | null>;
    currentQuality: _angular_core.WritableSignal<string>;
    sleepTimer: _angular_core.WritableSignal<number | null>;
    sleepTimerActive: _angular_core.WritableSignal<boolean>;
    loopEnabled: _angular_core.WritableSignal<boolean>;
    private controlsTimer;
    private sleepTimerInstance;
    state: _angular_core.Signal<VideoPlayerState>;
    private get defaultConfig();
    constructor(elementRef: ElementRef);
    onDocumentClick(event: Event): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setupEventListeners;
    private setupKeyboardShortcuts;
    private isInputFocused;
    onLoadStart(): void;
    onLoadedMetadata(): void;
    onLoadedData(): void;
    onCanPlay(): void;
    onCanPlayThrough(): void;
    onPlay(): void;
    onPause(): void;
    onEnded(): void;
    onTimeUpdate(): void;
    onProgress(): void;
    onVolumeChange(): void;
    onError(event: ErrorEvent): void;
    togglePlayPause(): void;
    seek(time: number): void;
    setVolume(volume: number): void;
    toggleMute(): void;
    toggleFullscreen(): void;
    private enterFullscreen;
    private exitFullscreen;
    retry(): void;
    skipBackward(): void;
    skipForward(): void;
    private initializeCaptions;
    toggleCaptions(): void;
    toggleSettings(): void;
    closeSettings(): void;
    setPlaybackSpeed(speed: number): void;
    openSettingsPanel(panel: string): void;
    closeSettingsPanel(): void;
    changeQuality(quality: string): void;
    changeVideoSource(source: VideoSource): void;
    getSpeedLabel(): string;
    getQualityLabel(): string;
    setSleepTimer(minutes: number | null): void;
    getSleepTimerLabel(): string;
    toggleLoop(): void;
    togglePictureInPicture(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private showControlsTemporarily;
    formatTime(seconds: number): string;
    private emitEvent;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RmNgVideoPlayerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RmNgVideoPlayerComponent, "rm-ng-video-player", never, { "videoConfig": { "alias": "videoConfig"; "required": false; }; "videoSources": { "alias": "videoSources"; "required": false; }; }, { "playerEvent": "playerEvent"; "stateChange": "stateChange"; }, never, never, true, never>;
}

declare class VideoPlayerService {
    private destroyRef;
    private analytics;
    private playerInstances;
    private activePlayer;
    private networkStatus;
    private connectionSpeed;
    private pipSupported;
    private pipActive;
    constructor();
    /**
     * Register a video player instance
     */
    registerPlayer(id: string, playerRef: any): void;
    /**
     * Unregister a video player instance
     */
    unregisterPlayer(id: string): void;
    /**
     * Set the active player
     */
    setActivePlayer(id: string): void;
    /**
     * Get analytics data
     */
    getAnalytics(): VideoPlayerAnalytics;
    /**
     * Update analytics with new data
     */
    updateAnalytics(update: Partial<VideoPlayerAnalytics>): void;
    /**
     * Track video event for analytics
     */
    trackEvent(event: VideoPlayerEvent, playerId?: string): void;
    /**
     * Get optimal video quality based on network conditions
     */
    getOptimalQuality(availableQualities: VideoQuality[]): VideoQuality | null;
    /**
     * Generate adaptive streaming manifest
     */
    generateAdaptiveManifest(sources: VideoSource[]): string | null;
    /**
     * Prefetch video segments for smoother playback
     */
    prefetchSegments(videoUrl: string, segmentCount?: number): Promise<void[]>;
    /**
     * Picture-in-Picture support
     */
    isPictureInPictureSupported(): boolean;
    isPictureInPictureActive(): boolean;
    enterPictureInPicture(videoElement: HTMLVideoElement): Promise<void>;
    exitPictureInPicture(): Promise<void>;
    /**
     * Memory optimization utilities
     */
    cleanupUnusedResources(): void;
    /**
     * Performance monitoring
     */
    measurePerformance<T>(operation: string, fn: () => T): T;
    /**
     * Detect if device supports hardware acceleration
     */
    detectHardwareAcceleration(): Promise<boolean>;
    private initializeNetworkMonitoring;
    private initializePictureInPictureSupport;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<VideoPlayerService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<VideoPlayerService>;
}

declare class VideoProgressComponent {
    progressBar: ElementRef<HTMLDivElement>;
    currentTime: number;
    duration: number;
    buffered: TimeRanges | null;
    seek: EventEmitter<number>;
    isDragging: _angular_core.WritableSignal<boolean>;
    isHovering: _angular_core.WritableSignal<boolean>;
    hoverX: _angular_core.WritableSignal<number>;
    progressPercentage: _angular_core.Signal<number>;
    hoverPercentage: _angular_core.Signal<number>;
    hoverTime: _angular_core.Signal<number>;
    bufferedRanges: _angular_core.Signal<{
        start: number;
        end: number;
    }[]>;
    onProgressClick(event: MouseEvent): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseLeave(): void;
    private getSeekTimeFromEvent;
    formatTime(seconds: number): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<VideoProgressComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<VideoProgressComponent, "rm-video-progress", never, { "currentTime": { "alias": "currentTime"; "required": false; }; "duration": { "alias": "duration"; "required": false; }; "buffered": { "alias": "buffered"; "required": false; }; }, { "seek": "seek"; }, never, never, true, never>;
}

export { RmNgVideoPlayerComponent, VideoPlayerService, VideoProgressComponent };
export type { BufferedRange, VideoPlayerAnalytics, VideoPlayerConfig, VideoPlayerEvent, VideoPlayerEventType, VideoPlayerOptions, VideoPlayerState, VideoQuality, VideoSource, VideoTrack };
