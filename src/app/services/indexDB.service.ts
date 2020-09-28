import { Injectable } from '@angular/core';

const conf = {
  dbName: 'inspection',
  tableName: 'taskTable',
  version: 1 // Use a long long for this value (don't use a float)
}

@Injectable()
export class IndexDBService {
  db: any
  arrayKey = []
  constructor() {}
  open(): Promise<any> {
    return new Promise<any>((resolve,reject) => {
      const opendb = indexedDB.open(conf.dbName,conf.version);
      // 数据库打开成功
      opendb.onsuccess = (event: any) => {
        console.log('open indexDB')
        this.db = event.target.result
        resolve()
      }
      //打开新的数据库时，会回调此函数，改变name和version均会建立新的DB，所以都会发生此回调。
      opendb.onupgradeneeded = (event: any) => {
        this.db = event.target.result
        console.log('version',this.db.version);
        // 查看这个数据库是否包含数据表
        if (!this.db.objectStoreNames.contains(conf.tableName)) {
          // 如果没有存在这个存储空间，那么就创建这个数据表
          console.log('create the db:' + conf.tableName);
          let objectStore = this.db.createObjectStore(conf.tableName, {keyPath: 'id', autoIncrement: true});
          // 创建索引,那些字段可以被索引，这两个字段都是唯一的,索引名、字段名、是否唯一
          objectStore.createIndex('dateID','dateID', {unique: true});
          objectStore.createIndex('_id', '_id', {unique: true});
        }

      }

      // 数据库打开失败
      opendb.onerror = (event: any) => {
        console.log(event.target.errorCode);
        reject()
      }

    })
  }

  close() {
    this.db.close()
  }
  deleteDB() {
    this.close()
    let del = indexedDB.deleteDatabase(conf.dbName)
    del.onsuccess = (event: any) => {
      this.db = null
      console.log('数据库删除成功')
    }
    del.onerror = (event: any) => {
      console.log('数据库删除失败')
    }
  }
  //添加一个数据
  async add(data:any):Promise<any> {
    return new Promise((resolve,reject) => {
      // 创建一个事务
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      //获取存储对象里面的对象
      let objectStore = transaction.objectStore(conf.tableName);
      let req = objectStore.add(data)
      req.onsuccess=(e) => {
        //console.log('res',e.target.result)
        let res = e.target.result
        resolve({success:1,mes:'添加数据成功。',result:res})
      };
      req.onerror = () => {
        reject({success:0,mes:'添加数据失败。'})
      }
    })
  }
  //删除一个数据
  delete(keyValue:any):Promise<any> {
    console.log('delete')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);
      let req = objectStore.delete(keyValue)
      req.onsuccess=(e) => {
        //console.log('res',e.target.result)
        let res = e.target.result
        resolve({success:1,mes:'删除数据成功。',result:res})
      };
      req.onerror = (e) => {
        reject({success:0,mes:'删除数据失败。'})
      }
    })
  }
  //清空所有数据
  clear():Promise<any> {
    console.log('chear')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);
      let req = objectStore.clear()
      req.onsuccess=() => {
        resolve({success:1,mes:'清空数据成功。'})
      };
      req.onerror = () => {
        reject({success:0,mes:'清空数据失败。'})
      }
    })
  }
  //更新数据
  update(data):Promise<any> {
    console.log('update')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);

      var req = objectStore.get(data.id); //取出数据再保存
      req.onsuccess=(e) => {
        //console.log('res',e.target.result)
        let res = e.target.result
        res.taskInfo = data.taskInfo
        objectStore.put(res)
        resolve({success:1,mes:'更新数据成功。'})
      };
      req.onerror = () => {
        reject({success:0,mes:'更新数据失败。'})
      }
    })
  }
  //根据value取一个数据
  findbyKey(keyValue:any):Promise<any> {
    console.log('findbyKey')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);
      let req = objectStore.get(keyValue)
      req.onsuccess = () => {
        resolve({success:1,mes:'获取数据成功。',result:req.result})
      }
      req.onerror = () => {
        reject({success:0,mes:'获取数据失败。'})
      }

    })
  }
  //根据索引取多个数据
  search(indexName:any,indexValue:any):Promise<any> {
    // console.log('findbyIndex',indexName)
    // console.log('findbyIndex',indexValue)
    console.log('search')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);
      let boundKeyRange = IDBKeyRange.only(indexValue); //完全匹配
      let req = objectStore.index(indexName).openCursor(boundKeyRange)
      let result: any[] = new Array<any>();
      req.onsuccess = (e) => {
        let cursor = e.target.result;
        if(cursor){
          result.push(cursor.value)
          cursor.continue()
        }else{
          resolve({success:1,mes:'获取数据成功',result:result})
        }
      }
      req.onerror = () => {
        reject({success:0,mes:'获取数据失败。',result:req})
      }

    })
  }
  //取所有数据
  fetch():Promise<any> {
    console.log('fetch')
    return new Promise((resolve,reject) => {
      let transaction = this.db.transaction(conf.tableName, 'readwrite');
      let objectStore = transaction.objectStore(conf.tableName);
      let req = objectStore.openCursor()
      let result: any[] = new Array<any>();
      req.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        }else{
          resolve({success:1,mes:'获取全部数据成功',result:result})
        }
      }
      req.onerror = () => {
        reject({success:0,mes:'获取全部数据失败。'})
      }
    })
  }

}
