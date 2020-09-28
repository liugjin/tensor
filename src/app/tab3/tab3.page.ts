import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

import { SceneGraph } from '../components/scenegraph/scenegraph'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{
  @ViewChild('scenegraph') sceneGraph: SceneGraph;

  constructor() {

  }
  async ngOnInit() {

  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
    // this.sceneGraph.stopAnimation();
  }

}
