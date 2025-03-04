import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import { TileManager } from './TileManager'
import { createUINode } from '../Utils'
import DataManger from '../../Runtime/DataManager'
import ResourceManager from '../../Runtime/ResourceManager'

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const { mapInfo } = DataManger.Instance
    // 加载资源
    const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile')

    console.log(spriteFrames)

    // 遍历生成地图
    for (let i = 0; i < mapInfo.length; i++) {
      const colum = mapInfo[i]
      for (let j = 0; j < colum.length; j++) {
        const item = colum[j]

        // 如果为空则跳过
        if (item.src === null || item.type === null) {
          continue
        }

        // 新建节点
        const node = createUINode()

        const imgSrc = `tile (${item.src})`
        const spriteFrame = spriteFrames.find(item => item.name === imgSrc) || spriteFrames[0]

        // 获取TileManager实例并调用实例方法
        const tileManager = node.addComponent(TileManager)
        tileManager.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }

}
