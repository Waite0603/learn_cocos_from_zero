import { _decorator, AnimationClip, Component, Animation, SpriteFrame } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM, FSM_PARAM_TYPE_ENUM, PARAMS_NAME_ENUM } from '../../Enum';
import State from '../../Base/State';
const { ccclass, property } = _decorator;

export interface IParamsValue {
  type: FSM_PARAM_TYPE_ENUM,
  value: boolean | number
}

export const getInitParamsTrigger = () => {
  return {
    type: FSM_PARAM_TYPE_ENUM.TRIGGER,
    value: false
  }
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {
  // 参数列表
  params: Map<string, IParamsValue> = new Map()
  // 状态机列表
  stateMachines: Map<string, State> = new Map()
  // 当前状态
  private _currentState: State | null = null

  animationComponent: Animation

  waitingList: Array<Promise<SpriteFrame[]>> = []


  // 获取当前状态
  get currentState() {
    return this._currentState
  }

  // 设置当前状态
  set currentState(state: State | null) {
    this._currentState = state

    this._currentState?.run()
  }


  // 初始化
  async init() {
    this.animationComponent = this.addComponent(Animation)

    this.initParams()
    this.initStateMachines()

    await Promise.all(this.waitingList)
  }

  // 初始化参数列表
  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger())
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTrigger())
  }

  getParams(paramsName: string) {
    if(this.params.has(paramsName)) {
      return this.params.get(paramsName).value
    }

    return null
  }

   setParams(paramsName: string, value: boolean | number) {
    if(this.params.has(paramsName)) {
      this.params.get(paramsName).value
      this.run()
    }
  }

  initStateMachines() {
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new State(this, 'texture/player/idle/top', AnimationClip.WrapMode.Loop))
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new State(this, 'texture/player/turnleft/top'))
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT):
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT)) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT)
        } else if (this.params.get(PARAMS_NAME_ENUM.IDLE)) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE)
        }
        break

      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE)
    }
  }

}
