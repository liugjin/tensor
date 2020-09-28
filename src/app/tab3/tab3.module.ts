import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { NgZorroAntdMobileModule, Toast, Modal, ModalServiceComponent  } from 'ng-zorro-antd-mobile';
import { SceneGraph } from '../components/scenegraph/scenegraph'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    NgZorroAntdMobileModule
  ],
  declarations: [
    Tab3Page,
    SceneGraph
  ],
  providers: [Toast, Modal],
  entryComponents: [ModalServiceComponent]
})
export class Tab3PageModule {}
