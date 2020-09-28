import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';

import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule, Toast, Modal, ModalServiceComponent  } from 'ng-zorro-antd-mobile';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
    HttpClientModule,
    NgZorroAntdMobileModule,
  ],
  declarations: [Tab4Page],
  providers: [Toast, Modal],
  entryComponents: [ModalServiceComponent]
})
export class Tab4PageModule {}
