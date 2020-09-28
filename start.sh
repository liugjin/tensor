#!/bin/bash
cnpm i cordova ionic -g
#默认--type=angular
ionic start tensor tabs --capacitor
npm install ng-zorro-antd-mobile --save
ng add ng-zorro-antd-mobile
npm i face-api.js --save
#流媒体
ionic cordova plugin add cordova-plugin-streaming-media
npm install @ionic-native/streaming-media
#文本转语音
ionic cordova plugin add cordova-plugin-tts
npm install @ionic-native/text-to-speech
#视频
npm install videogular2 --save  #支持rtsp
npm install @types/core-js --save-dev
npm i hls.js --save
npm i dashjs --save
