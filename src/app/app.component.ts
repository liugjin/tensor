import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private customBackActionSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appMinimize: AppMinimize,
    private backgroundMode: BackgroundMode,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    //监听退出
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      this.appMinimize.minimize();
    })

    this.backgroundMode.enable();  //后台运行
    this.checkPermissions();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#108ee9');

      this.splashScreen.hide();
    });
  }

  checkPermissions(){
    // this.androidPermissions.requestPermissions(
    //   [this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    //   ]
    // );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      success => console.log("You have READ_EXTERNAL_STORAGE permission"),
      err => {
        console.log("Uh oh, looks like you don't have READ_EXTERNAL_STORAGE permission");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
      }
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      success => console.log("You have WRITE_EXTERNAL_STORAGE permission"),
      err => {
        console.log("Uh oh, looks like you don't have WRITE_EXTERNAL_STORAGE permission");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      }
    );
  }

}
