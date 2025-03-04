import { _decorator, Component, Node } from 'cc'
import { TileMapManager } from '../Tile/TileMapManager'
import { createUINode } from '../Utils'
import levels, { ILevel } from '../../Levels'
import { DataMangerInstance } from '../../Runtime/DataManager'
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager'
const { ccclass, property } = _decorator

@ccclass('BattleManager')
export class BattleManager extends Component {

    level: ILevel
    stage: Node

    start() {
      this.initLevel()
    }

    initLevel () {
      const level = levels['level1']

      console.log('level', level)

      if (level) {
        this.level = level

        DataMangerInstance.mapInfo = this.level.mapInfo
        DataMangerInstance.mapRowCount = this.level.mapInfo.length || 0
        DataMangerInstance.mapColumnCount = this.level.mapInfo[0].length || 0

        this.generateTileMap()
      }
    }

    // 生成地图
    generateTileMap() {
      // 创建舞台
      this.stage = createUINode('Stage')
      this.stage.setParent(this.node)

      // 创建地图
      const tileMap = createUINode('TileMap')
      tileMap.setParent(this.stage)

      const tileMapManager = tileMap.addComponent(TileMapManager)
      tileMapManager.init()

      // 屏幕适配
      this.adaptPosition()

    }

    // 屏幕适配
    adaptPosition() {
      const { mapRowCount, mapColumnCount } = DataMangerInstance
      const disX = TILE_WIDTH * mapRowCount / 2 - 20
      const disY = TILE_HEIGHT * mapColumnCount / 2

      this.stage.setPosition(-disX, disY)
    }
}


