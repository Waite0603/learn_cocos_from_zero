/****
 * 1. Know this.animationClip
 * 2. can play animation
 */
import { animation, AnimationClip, Sprite, SpriteFrame } from 'cc';
import { PlayerStateMachine } from '../Scripts/Player/PlayerStateMachine'
import ResourceManager from '../Runtime/ResourceManager';

const ANIMATION_SPEED = 1 / 8

export default class State {


  private animationClip: AnimationClip

  constructor(
    private fsm: PlayerStateMachine,
    private path: string,
    private wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal
  ) {
    this.init()
  }


  async init() {
    // 加载人物资源
    const promise = ResourceManager.Instance.loadDir(this.path)

    this.fsm.waitingList.push(promise)

    const spriteFrames = await promise

    // https://docs.cocos.com/creator/3.8/manual/zh/animation/use-animation-curve.html
    // 程序化编辑动画剪辑
    this.animationClip = new AnimationClip()

    const track = new animation.ObjectTrack()
    // 设置动画轨道的目标对象
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame')
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [index * ANIMATION_SPEED, item])
    track.channel.curve.assignSorted(frames)

    // // 最后将轨道添加到动画剪辑中
    this.animationClip.addTrack(track)

    this.animationClip.duration = frames.length * ANIMATION_SPEED  // 整个动画的周期
    this.animationClip.wrapMode = AnimationClip.WrapMode.Loop  // 循环播放
  }

  run() {
    this.fsm.animationComponent.defaultClip = this.animationClip
    this.fsm.animationComponent.play()
  }
}
