import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Toast, Modal } from 'ng-zorro-antd-mobile';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx';
import { proxy } from '@ionic-native/proxy/ngx';
import * as _ from 'underscore'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private prefer
  URIs = [
    'rtsp://admin:hyiot123@127.0.0.1:8554/Streaming/Channels/101/',
    'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov'
  ]

  constructor(private tts: TextToSpeech,
    private streamingMedia: StreamingMedia,
    private screenOrientation: ScreenOrientation,
    private _modal: Modal,
    private _toast: Toast,
    private file: File,
    private proxy: proxy) {

    this.screenOrientation.unlock();//允许用户转屏

    if(localStorage.getItem('URIs')) this.URIs = localStorage.getItem('URIs').split(',')

    console.log('proxy',this.proxy)
    this.proxy.connect({
      server_addr: "106.14.145.247",
      server_port: 7000,
      ctype: "stcp",
      server_name: "mu2000",
      bind_addr: "127.0.0.1",
      bind_port: 8554
    }).then((res: any) => console.log("success:",res))
      .catch((error: any) => console.error("error:",error));

    this.tts.speak({text: "请您点击右上角添加一个流媒体地址",
            locale: 'zh-CN',
            rate: 1})
        .then(() => console.log('Success'))
        .catch((reason: any) => console.log(reason));
  }
  ngAfterViewInit() {

  }
  async fileStorage(dataString) {
    console.info("当前程序的目录",this.file.applicationDirectory);
    console.info("程序的数据目录",this.file.applicationStorageDirectory);
    console.info("程序的数据目录",this.file.dataDirectory);
    console.info("程序的暂存目录",this.file.cacheDirectory);
    //Android中的目录
    console.info("Android扩展存储应用目录",this.file.externalApplicationStorageDirectory);
    console.info("Android扩展存储数据目录",this.file.externalDataDirectory);
    console.info("Android扩展存储缓存目录",this.file.externalCacheDirectory);
    console.info("Android扩展根目录",this.file.tempDirectory);
    //iOS中的目录
    console.info("临时目录",this.file.tempDirectory);
    console.info("云存储目录",this.file.syncedDataDirectory);
    console.info("文档目录",this.file.documentsDirectory);
    console.info("共享目录",this.file.sharedDirectory);

    console.info("createFile",this.file.createFile);
    let entry = await this.file.createFile(this.file.dataDirectory,'frpc.ini',true)
    console.info("entry",entry.toURL()) //file:///data/data/io.cordova.myapp84ea27/files/files/test1.txt
    entry.createWriter( fileWriter => {
        fileWriter.write(dataString);
        //写入结束
        fileWriter.onwriteend = () => {
            console.log('写入文件成功');
            let readText = this.file.readAsText(this.file.dataDirectory,"frpc.ini")
            console.info("readText",readText)
        }
        fileWriter.onerror = (e) => {
            console.log('写入文件失败:', e);
        }
    });
  }

  addStream() {
    this.showPromptPromise();
  }

  showPromptPromise() {
    Modal.prompt(
      'URI地址',
      '',
      [
        {
          text: '取消',
          onPress: value =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
              }, 100);
            })
        },
        {
          text: '确定',
          onPress: value =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
                this.startStream(value)
              }, 100);
            })
        }
      ],
      'default',
      null,
      ['URI address']
    );
  }
  startStream(URI) {
    let options: StreamingVideoOptions = {
      successCallback: () => {
        if(_.indexOf(this.URIs,URI) < 0){
          this.URIs.push(URI)
          localStorage.setItem('URIs', this.URIs.toString())
        }
      },
      errorCallback: (e) => {
        this.tts.speak({text: "播放错误",locale: 'zh-CN'})
      },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };
    this.streamingMedia.playVideo(URI, options);
  }
  press(e) {
    Modal.alert('删除URI', '确定 ?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.URIs = this.URIs.filter(u => u != e) }
    ])
    console.info(e)
  }

}
