import { Component, Input, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";  //载入材质
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'scenegraph',
  template: '<div style="width:100%; height:60%"></div>'
})
export class SceneGraph {

  @Input() geometry: string;

  private renderer = new THREE.WebGLRenderer({antialias:true});   //antialias:true增加抗锯齿效果
  private scene: THREE.Scene;
  private camera: THREE.Camera;

  private rotateSpeed = 1.0;
  private zoomSpeed = 1.2;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private mesh: any;  //类型不固定
  private animating: boolean = true;

  constructor(private ElementRef: ElementRef) {
    this.clock = new THREE.Clock(); //用于更新轨道控制器
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcfcfcf);
    //摄像机
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.z = 1000;
    this.camera.position.set(0, 50, 150);//设置相机位置
    this.camera.lookAt(new THREE.Vector3(0,0,0));  //让相机指向原点
    // this.camera.updateProjectionMatrix(); //更新相机投影矩阵，必须在参数发生变化后调用
  }

  ngAfterViewInit() {
    //渲染场景
    let width = this.ElementRef.nativeElement.childNodes[0].clientWidth;
    let height = this.ElementRef.nativeElement.childNodes[0].clientHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.setClearColor(new THREE.Color(0xff00ff),1); //设置窗口背景颜色,设置scene.background会覆盖
    this.renderer.autoClear = true;
    this.ElementRef.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
    //添加轨道控制器
    this.setUpOrbitControls();
    //添加光线
    // let light = new THREE.AmbientLight( 0x606060 ); //自然光AmbientLight,平行光DirectionalLight，点光PointLight
    // let light = new THREE.PointLight( "white","0.9","1000" ); //点光源
    let light = new THREE.DirectionalLight(0xffffff,2); //平行光源
    light.position.set( 20, 20, 50 ).normalize();
    this.scene.add(light);
    // 网格宽度、等分数、中心线颜色，网格线颜色
    let grid = new THREE.GridHelper(150,20,0xf0f0f0,0xffffff);
    grid.position.set(0,20,0)
    this.scene.add(grid);
    //坐标轴辅助
    let axes = new THREE.AxesHelper(100);
    this.scene.add(axes);
    //载入物体
    this.gltfLoader()

    setTimeout(() =>this.render(),0)
  }

  private setUpOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 0, 0); //控制焦点
    this.controls.autoRotate = false; //将自动旋转关闭
    this.controls.rotateSpeed = this.rotateSpeed;
    this.controls.zoomSpeed = this.zoomSpeed;

    this.controls.addEventListener('change', () => {
        this.renderer.render(this.scene, this.camera);
    });
  }
  //渲染
  render() {
    requestAnimationFrame(() => { this.render() });  //不停渲染
    this.controls.update();
    if(this.animating && this.mesh && this.mesh.rotation) this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
  // //创建一个立方体
  // creatLoader(){
  //   let geometry = new THREE.BoxGeometry(10, 30, 30, 3, 3, 3); //创建立方体
  //   let material = new THREE.MeshLambertMaterial({  //创建材料,MeshBasicMaterial
  //       color:0xffff00,
  //       wireframe:false
  //   });
  //   this.mesh = new THREE.Mesh(geometry, material);  //创建立方体网格模型
  //   this.mesh.position.set(0, 35, 0);  //设置立方体的坐标
  //   this.scene.add(this.mesh);  //将立方体添加到场景中
  // }
  //three.js自带json加载
  jsonLoader() {
    let loader = new THREE.ObjectLoader();
    loader.load("assets/model/Server.json", sprit => this.scene.add(sprit));
  }
  // objLoader() {
  //   let loader = new OBJLoader();
  //   let mtlLoader = new MTLLoader();
  //   loader.load("assets/model/smiley/smiley.obj", sprit => this.scene.add(sprit));
  //   mtlLoader.setTexturePath("assets/model/smiley/");
  //   mtlLoader.load("assets/model/smiley/smiley.mtl", material => {
  //     loader.setMaterials(material);    //会报类型错误
  //     loader.load("assets/model/smiley/smiley.obj", sprit => this.scene.add(sprit));
  //   });
  // }
  gltfLoader() {
    let loader = new GLTFLoader();
    loader.load("assets/model/gltf/model.gltf", gltf => {
      this.mesh = gltf.scene
      let scale = 10;
      this.mesh.scale.set(scale, scale, scale);
      this.mesh.position.set(0, 30, 0);  //设置立方体的坐标
      // gltf.scene.traverse( processGLTFChild );
      this.scene.add( this.mesh );
    })
  }


  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {

  }

}
