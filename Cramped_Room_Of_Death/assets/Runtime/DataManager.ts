import { ITile } from "../Levels"

class DataManger {
  mapInfo: Array<Array<ITile>>
  mapRowCount: number
  mapColumnCount: number
}


export const DataMangerInstance = new DataManger()
