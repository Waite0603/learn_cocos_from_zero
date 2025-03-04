import Singleton from "../Base/Singleton"
import { ITile } from "../Levels"

export default class DataManger extends Singleton {

  // 重写GetInstance方法
  static get Instance(): DataManger {
    return super.GetInstance<DataManger>()
  }

  mapInfo: Array<Array<ITile>>
  mapRowCount: number
  mapColumnCount: number
  levelIndex: number = 1

  // reset
  reset() {
    this.mapInfo = []
    this.mapRowCount = 0
    this.mapColumnCount = 0
  }
}
