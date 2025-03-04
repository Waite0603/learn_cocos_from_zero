import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'
const { ccclass, property } = _decorator
import levels from '../../Levels'

// 定义瓦片的宽高
export const TILE_WIDTH = 55
export const TILE_HEIGHT = 55

@ccclass('TileManager')
export class TileManager extends Component {
  init(spriteFrames: SpriteFrame, i: number, j: number) {
    const sprite = this.addComponent(Sprite)

    sprite.spriteFrame = spriteFrames

    // 设置节点位置以及宽高
    const transform = this.getComponent(UITransform)
    transform.setContentSize(TILE_WIDTH, TILE_HEIGHT)

    // 设置节点位置
    this.node.setPosition(i * TILE_WIDTH, -j * TILE_HEIGHT)
  }
}


