import { Component, OnInit, ViewChild } from "@angular/core";
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { BitrateOption, VgAPI } from 'videogular2/core';
import { Subscription } from 'rxjs';
import { IDRMLicenseServer } from 'videogular2/streaming';
import { VgDASH } from 'videogular2/src/streaming/vg-dash/vg-dash';
import { VgHLS } from 'videogular2/src/streaming/vg-hls/vg-hls';

export interface IMedia {
    type: 'video/mp4' | 'vod' | 'dash' | 'hls';
    source: string;
    label: string;
    token?: string;
    licenseServers?: IDRMLicenseServer;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
    @ViewChild(VgDASH) vgDash: VgDASH;
    @ViewChild(VgHLS) vgHls: VgHLS;

    bitrates: BitrateOption[];

    streams: IMedia[] = [
        {
            type: 'video/mp4',
            label: 'video-mov',
            source: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
        },
        {
            type: 'video/mp4',
            label: 'video-mp4-1',
            source: 'http://static.videogular.com/assets/videos/videogular.mp4',
        },
        {
            type: 'video/mp4',
            label: 'video-mp4-2',
            source: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
        },
        {
            type: 'vod',
            label: 'video-mp4-3',
            source: 'http://static.videogular.com/assets/videos/videogular.mp4'
        },
        {
            type: 'dash',
            label: 'webrtc-dash流',
            source: 'http://dash.edgesuite.net/akamai/bbb_30fps/bbb_30fps.mpd'
        },
        {
            type: 'hls',
            label: 'webrtc-hls流',
            source: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
        }
    ];

    currentIndex = 0;
    currentItem: IMedia = this.streams[ this.currentIndex ];
    api: VgAPI;

    height: number = document.documentElement.clientHeight;
    state = {open: false};

    onOpenChange(event) {
        this.state.open = !this.state.open;
    }

    constructor(private tts: TextToSpeech) {
      this.tts.speak({text: "点击左上角可以切换视频",
              locale: 'zh-CN',
              rate: 0.75})
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    ngOnInit() {
        this.currentItem = this.streams[ 0 ];
    }

    setBitrate(option: BitrateOption) {
        switch (this.currentItem.type) {
            case 'dash':
                this.vgDash.setBitrate(option);
                break;

            case 'hls':
                this.vgHls.setBitrate(option);
                break;
        }
    }

    nextVideo() {
        this.currentIndex++;

        if (this.currentIndex === this.streams.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.streams[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(stream: IMedia, index: number) {
        this.currentIndex = index;
        this.currentItem = stream;
    }

    ionViewDidEnter() {
    }

    ionViewDidLeave() {
      this.api.pause();
    }
}
