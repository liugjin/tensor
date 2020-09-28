import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()
export class GraphqlService {
  user:any = null
  station = 'station'

  constructor(private http: HttpClient,private StorageService: StorageService) {}

  graphql(url,formData) {
    let user = this.StorageService.getItem('user') //取缓存
    if(user){
      this.user = user._id
    }
    //console.log(formData)
    return this.http.post(`${url}/${this.user}/${this.station}`, formData)
  }
}
