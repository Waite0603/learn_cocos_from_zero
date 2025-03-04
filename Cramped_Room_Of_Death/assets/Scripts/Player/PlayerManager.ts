import { _decorator, animation, Animation, AnimationClip, Component, Node, sp, Sprite, SpriteFrame, UITransform } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM, PARAMS_NAME_ENUM } from '../../Enum';
import { TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;



@ccclass('PlayerManager')
export class PlayerManager extends Component {

  x: number = 0
  y: number = 0
  targetX: number = 0
  targetY: number = 0

  fsm: PlayerStateMachine

  // 移动的速度
  private readonly speed = 1 / 10

  async init() {
    // await this.render()
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM
    const transform = this.getComponent(UITransform)
    transform?.setContentSize(TILE_WIDTH * 4, TILE_WIDTH * 4)

    this.fsm = this.addComponent(PlayerStateMachine)

    if (!this.fsm) {
      console.error('PlayStateMachine component not found on the node.')
      return
    }

    await this.fsm.init()
    this.fsm.setParams(PARAMS_NAME_ENUM.IDLE, true)

    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this)
  }

  update() {
    this.updateXY()
    this.node.setPosition((this.x - 1.5) * TILE_WIDTH, (this.y + 1.5) * TILE_WIDTH)
  }


  // 移动
  move(inputDirection: CONTROLLER_ENUM) {
    switch (inputDirection) {
      case CONTROLLER_ENUM.TOP:
        this.targetY = this.y + 1
        break
      case CONTROLLER_ENUM.BOTTOM:
        this.targetY = this.y - 1
        break
      case CONTROLLER_ENUM.LEFT:
        this.targetX = this.x - 1
        break
      case CONTROLLER_ENUM.RIGHT:
        this.targetX = this.x + 1
        break
      case CONTROLLER_ENUM.TURNLEFT:
        this.fsm.setParams(PARAMS_NAME_ENUM.TURNLEFT, true)
        break
    }
  }

  // 更新
  updateXY() {
    if (this.targetX < this.x) this.x -= this.speed
    else if (this.targetX > this.x) this.x += this.speed

    if (this.targetY < this.y) this.y -= this.speed
    else if (this.targetY > this.y) this.y += this.speed

    // 如果两个数字相差小于0.1，就认为到达目标点
    if (Math.abs(this.targetX - this.x) < 0.1) this.x = this.targetX
    if (Math.abs(this.targetY - this.y) < 0.1) this.y = this.targetY
  }
}


