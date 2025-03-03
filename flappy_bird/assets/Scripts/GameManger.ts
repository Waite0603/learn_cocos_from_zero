import { _decorator, Component, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
const { ccclass, property } = _decorator;


// 定义游戏状态
enum GameState {
    Ready,
    Playing,
    Over
}
 
@ccclass('GameManger')
export class GameManger extends Component {

    @property(Bird)
    bird: Bird = null; 

    @property(MoveBg)
    bgMoving: MoveBg = null;

    @property(MoveBg)
    landMoving: MoveBg = null;

    @property(PipeSpawner)
    pipeSpawner: PipeSpawner = null;

    @property(GameReadyUI)
    gameReadyUI: GameReadyUI = null;


    // 游戏状态
    _currentState: GameState = GameState.Ready;
    
    // 单例
    private static _instance: GameManger = null;
    public static get instance(): GameManger {
        return GameManger._instance;
    }

    protected onLoad(): void {
        GameManger._instance = this;
    }
    
    start() {
        this.toReady();
    }

    // 转化为游戏准备状态
    public toReady(){
        this._currentState = GameState.Ready;
        this.bird.disableControl();
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause();
    }

    // 转化为游戏进行状态
    public toPlaying(){
        this._currentState = GameState.Playing;
        this.bird.enableControl();
        this.bgMoving.enableMoving();
        this.landMoving.enableMoving();
        this.pipeSpawner.start();
        this.gameReadyUI.node.active = false;
    }

    // 转化为游戏结束状态
    public toOver(){
        this._currentState = GameState.Over;
        this.bird.disableControl();
        this.bgMoving.disableMoving();
        this.landMoving.disableMoving();
        this.pipeSpawner.pause();
    }
}
  

