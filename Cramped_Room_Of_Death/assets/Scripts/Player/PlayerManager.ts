import { _decorator, animation, Animation, AnimationClip, Component, Node, sp, Sprite, SpriteFrame, UITransform } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enum';
import { TILE_WIDTH } from '../Tile/TileManager';
import ResourceManager from '../../Runtime/ResourceManager';
const { ccclass, property } = _decorator;

const ANIMATION_SPEED = 1 / 8

@ccclass('PlayerManager')
export class PlayerManager extends Component {

  x: number = 0
  y: number = 0
  targetX: number = 0
  targetY: number = 0

  // 移动的速度
  private readonly speed = 1 / 10

  async init() {
    await this.render()

    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this)
  }

  update() {
    this.updateXY()
    this.node.setPosition((this.x - 1.5) * TILE_WIDTH, (this.y + 1.5) * TILE_WIDTH)
  }

  async render() {
    const sprite = this.addComponent(Sprite)

    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const transform = this.getComponent(UITransform)

    transform?.setContentSize(TILE_WIDTH * 4, TILE_WIDTH * 4)

    // 加载人物资源
    const spriteFrames = await ResourceManager.Instance.loadDir('texture/player/idle/top')
    const animationComponent = this.addComponent(Animation)

    // https://docs.cocos.com/creator/3.8/manual/zh/animation/use-animation-curve.html
    // 程序化编辑动画剪辑
    const animationClip = new AnimationClip()

    const track = new animation.ObjectTrack()
    // 设置动画轨道的目标对象
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame')
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [index * ANIMATION_SPEED, item])
    track.channel.curve.assignSorted(frames)

    // 最后将轨道添加到动画剪辑中
    animationClip.addTrack(track)

    animationClip.duration = frames.length * ANIMATION_SPEED  // 整个动画的周期
    animationClip.wrapMode = AnimationClip.WrapMode.Loop  // 循环播放
    animationComponent.defaultClip = animationClip
    animationComponent.play()
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


