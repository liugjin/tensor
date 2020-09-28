http://www.ionic.wang/course-index.html#cours #ionic4
chrome://inspect/#devices
http://ng.mobile.ant.design/
https://github.com/tensorflow/models/blob/master/research/slim/nets/mobilenet_v1.md #models
cnpm i cordova ionic -g
#添加自定义插件
ionic cordova plugin add ../plug/cordova-plugin-proxy
添加@ionic-native/proxy
#file插件
ionic cordova plugin add cordova-plugin-file
npm install @ionic-native/file --save-dev
#最小化插件
ionic cordova plugin add cordova-plugin-appminimize
npm install @ionic-native/app-minimize --save-dev
#默认--type=angular
ionic start tensor tabs --capacitor
npm i face-api.js --save
#three.js
npm install three --save
npm install @types/three --save-dev
#手势
npm install hammerjs --save
main.ts中添加  -> import 'hammerjs';
#ng-zorro,在 src 目录下建立一个单独的 theme.less 文件,在 angular.json 文件的 styles 列表加入该文件
npm install ng-zorro-antd-mobile --save
ng add ng-zorro-antd-mobile
#流媒体
ionic cordova plugin add cordova-plugin-streaming-media  
npm install @ionic-native/streaming-media --save-dev
ionic cordova plugin remove cordova-plugin-streaming-media  
#文本转语音
ionic cordova plugin add cordova-plugin-tts
npm install @ionic-native/text-to-speech
#视频
npm install videogular2 --save  #支持rtsp
npm install @types/core-js --save-dev
npm i hls.js --save
npm i dashjs --save
#防止后台睡觉
ionic cordova plugin add cordova-plugin-background-mode
npm install @ionic-native/background-mode --save-dev
#全屏
ios全屏设置，在config.xml中添加下面代码：
<preference name="AllowInlineMediaPlayback" value="true" />
#视频自动转屏：cordova-plugin-screen-orientation
$ ionic cordova plugin add cordova-plugin-screen-orientation
$ npm install --save @ionic-native/screen-orientation
#运行时权限检测
ionic cordova plugin add cordova-plugin-android-permissions
npm install @ionic-native/android-permissions
https://github.com/krossruiz/ionic3-webrtc-chat-app
#相机预览
ionic cordova plugin add cordova-plugin-camera-preview
npm install @ionic-native/camera-preview
<config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription" overwrite="true">
  <string>Allow the app to use your camera</string>
</config-file>
<gap:config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription" overwrite="true">
  <string>Allow the app to use your camera</string>
</gap:config-file>

pip install tensorflowjs
tensorflowjs_converter --input_format keras mobilenet_2_5_224_tf.h5 model
tensorflowjs_converter \
    --input_format=keras_saved_model \
    ./mobilenet \
    ./model

#!/usr/bin/python
# -*- coding: utf-8 -*-
import tensorflow as tf
import h5py
cpktinput = r'./mobilenet'
with open(cpktinput, 'r') as f:
  cpktFileName = f.readline().split('"')[1]     
h5FileName = r'./model.h5'
reader = tf.train.NewCheckpointReader(cpktFileName)
f = h5py.File(h5FileName, 'w')
t_g = None
for key in sorted(reader.get_variable_to_shape_map()):
  if key.endswith('w') or key.endswith('biases'):
    keySplits = key.split(r'/')
    keyDict = keySplits[1] + '/' + keySplits[1] + '/' + keySplits[2]
    f[keyDict] = reader.get_tensor(key)

#PERMISSION
checkPermissions(){
    this.androidPermissions.requestPermissions(
      [this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.RECORD_AUDIO
      ]
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      success => console.log("You have CAMERA permission"),
      err => {
        console.log("Uh oh, looks like you don't have CAMERA permission");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      }
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      success => console.log("You have RECORD_AUDIO permission"),
      err => {
        console.log("Uh oh, looks like you don't have RECORD_AUDIO permission");
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO);
      }
    );
}
#插件
git clone https://github.com/ionic-team/ionic-native.git
cd ionic-native
npm install gulp -g
npm i
gulp plugin:create -n p2p
npm run build p2p
cordova plugin list
