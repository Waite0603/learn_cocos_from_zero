import { _decorator, Component, Node } from 'cc'
import { TileMapManager } from '../Tile/TileMapManager'
import { createUINode } from '../Utils'
import levels, { ILevel } from '../../Levels'
import DataManger  from '../../Runtime/DataManager'
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager'
import EventManager from '../../Runtime/EventManager'
import { EVENT_ENUM } from '../../Enum'
const { ccclass, property } = _decorator

@ccclass('BattleManager')
export class BattleManager extends Component {

    level: ILevel
    stage: Node

    // 防止多次注册方法
    private eventRegistered: boolean = false

    onLoad() {
      // 绑定事件到事件中心
      if (!this.eventRegistered) {
        EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
        this.eventRegistered = true
      }
    }

    onDestroy() {
      // 移除事件
      EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel)
      this.eventRegistered = false
    }

    start() {
      this.initLevel()
    }

    initLevel () {
      const level = levels[`level${DataManger.Instance.levelIndex}`]

      if (level) {

        if(this.stage) this.clearStage()
        this.level = level

        DataManger.Instance.mapInfo = this.level.mapInfo
        DataManger.Instance.mapRowCount = this.level.mapInfo.length || 0
        DataManger.Instance.mapColumnCount = this.level.mapInfo[0].length || 0

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

    // 清空舞台
    clearStage() {
      this.stage.destroyAllChildren()
      DataManger.Instance.reset()
    }

    // 下一关
    nextLevel() {
      DataManger.Instance.levelIndex = DataManger.Instance.levelIndex + 1
      this.initLevel()
    }

    // 上一关
    prevLevel() {
      console.log('prevLevel')
    }

    // 屏幕适配
    adaptPosition() {
      const { mapRowCount, mapColumnCount } = DataManger.Instance
      const disX = TILE_WIDTH * mapRowCount / 2 - 20
      const disY = TILE_HEIGHT * mapColumnCount / 2

      this.stage.setPosition(-disX, disY)
    }
}


