import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule, Toast, Modal, ModalServiceComponent  } from 'ng-zorro-antd-mobile';

import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";
import { VgStreamingModule } from "videogular2/streaming";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    HttpClientModule,
    NgZorroAntdMobileModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  declarations: [Tab2Page],
  providers: [Toast, Modal],
  entryComponents: [ModalServiceComponent]
})
export class Tab2PageModule {}
