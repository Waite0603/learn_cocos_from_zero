import { _decorator, Component, Input, input, Node } from 'cc';
import { GameManger } from '../GameManger';
const { ccclass, property } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        GameManger.instance.toPlaying();
        console.log('onTouchStart');
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


