import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  constructor() {
    // let p = this.isPC()
    // console.log('ispc:'+p)
  }
  //设备是否为PC
  isPC() {
    let userAgent = navigator.userAgent
    let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"]
    let flag = true
    for(let v of Agents){
      if(userAgent.indexOf(v) > 0){
        flag = false
        break
      }
    }
    return flag
  }
  //获取设备平台
  getPlat() {
    let userAgent = navigator.userAgent
    if(userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1){
      return 'Android'
    }else if(userAgent.indexOf('iPhone') > -1){
      return 'iPhone'
    }else if(userAgent.indexOf('Windows Phone') > -1){
      return "WinPhone"
    }
  }
  //是否为微信
  isWeiXin() {
    let userAgent = navigator.userAgent.toLowerCase()
    if(userAgent.indexOf('micromessenger') != -1){
      return true
    }else{
      return false
    }
  }
  //base64转成二进制码
  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let bufferLen = new ArrayBuffer(byteString.length);
    let arr = new Uint8Array(bufferLen);
    for (let i = 0; i < byteString.length; i++) {
        arr[i] = byteString.charCodeAt(i);
    }
    let b = new Blob([bufferLen], {type: mimeString})
    //console.log('blob:',b)
    return b;
  }
}
