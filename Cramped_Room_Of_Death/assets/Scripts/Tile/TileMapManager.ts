import { _decorator, Component, Layers, Node, random, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import { TileManager } from './TileManager'
import { createUINode, randomByRange } from '../Utils'
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

        let number = item.src
        // 如果 number = 1 / 5 / 9 随机
        if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
          number += randomByRange(0, 4)
        }

        const imgSrc = `tile (${number})`
        const spriteFrame = spriteFrames.find(item => item.name === imgSrc) || spriteFrames[0]

        // 获取TileManager实例并调用实例方法
        const tileManager = node.addComponent(TileManager)
        tileManager.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }

}
