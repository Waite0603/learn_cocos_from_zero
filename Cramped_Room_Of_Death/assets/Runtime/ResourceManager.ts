import { _decorator, resources, SpriteFrame } from 'cc'
import Singleton from '../Base/Singleton'
const { ccclass } = _decorator

export default class ResourceManager extends Singleton {

  // 重写GetInstance方法
  static get Instance(): ResourceManager {
    return super.GetInstance<ResourceManager>()
  }


  loadDir(path: string, type: typeof SpriteFrame = SpriteFrame) {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir<SpriteFrame>(path, type, (err, res) => {
        if (err) {
          reject(err)
          return
        }
        resolve(res)
      })
    })
  }
}
