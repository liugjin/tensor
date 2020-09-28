import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//添加
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { proxy } from '@ionic-native/proxy/ngx';
import { SpeechService } from './services/speech.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TextToSpeech,
    StreamingMedia,
    ScreenOrientation,
    CameraPreview,
    BackgroundMode,
    File,
    AppMinimize,
    AndroidPermissions,
    proxy,
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
