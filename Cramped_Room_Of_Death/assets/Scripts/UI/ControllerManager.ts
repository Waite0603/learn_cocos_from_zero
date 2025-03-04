import { _decorator, Component, Node } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../Enum';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {

  handleClick(event: Event, type: string) {
    // 如果获取的事件名称为 TURNLEFT 或 TURNRIGHT 则触发 PLAYER_CTRL 事件
    if (type === CONTROLLER_ENUM.TURNRIGHT) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)

      return
    }

    EventManager.Instance.emit(EVENT_ENUM.PLAYER_CTRL, type as CONTROLLER_ENUM)
  }
}


