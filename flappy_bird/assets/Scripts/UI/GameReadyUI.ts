import { _decorator, Component, Input, input, Node } from 'cc';
import { GameManger } from '../GameManger';
const { ccclass, property } = _decorator;


// 定义游戏状态
enum GameState {
    Ready,
    Playing,
    Over
}

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {


    onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        // 检测游戏状态
        if (GameManger.instance._currentState != GameState.Ready) return;
        
        GameManger.instance.toPlaying();
        console.log('onTouchStart');
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


