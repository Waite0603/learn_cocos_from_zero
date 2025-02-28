import { _decorator, Component, instantiate, Prefab, Node, Vec3, Label } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

// 赛道格子类型，坑（BT_NONE）或者实路（BT_STONE）
enum BlockType {
    BT_NONE,
    BT_STONE,
};


// 定义游戏状态类型
enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
};

@ccclass("GameManager")
export class GameManager extends Component {

    // 引用PlayerController
    @property({ type: PlayerController })
    public playCtrl: PlayerController | null = null;

    // 绑定菜单节点
    @property({ type: Node })
    public menuNode: Node | null = null;

    // 赛道预制
    @property({ type: Prefab })
    public cubePrfb: Prefab | null = null;
    // 赛道长度
    @property
    public roadLength = 10;
    private _road: BlockType[] = [];

    // 分数 Label
    @property({ type: Label })
    public scoreLabel: Label | null

    // 游戏标题 Label
    @property({ type: Label })
    public titleLabel: Label | null


    // 记录游戏时间
    // 在 GameManager 类中添加一个更新定时器
    private _startTime: number = 0;
    private _timeCounter: number = 0; // 以秒为单位的计时器
    private _timerEnabled: boolean = false;    // 获取时间 Label
    @property({ type: Label })
    public timeLabel: Label | null

    // 游戏状态
    private _curState: GameState | null = null;
    start() {
        this.curState = GameState.GS_INIT;

        // 接收 jump-end 事件
        this.playCtrl?.node.on('jump-end', this.checkGameEnd, this);
    }


    // 游戏初始化
    gameInit() {
        // 重置游戏状态
        this.playCtrl?.reset();

        this.scoreLabel.string = '0';
        // 菜单
        if (this.menuNode) {
            this.menuNode.active = true;
        }

        console.log('gameInit');
        this.generateRoad();

        // 初始化角色
        if (this.playCtrl) {
            this.playCtrl.node.setPosition(Vec3.ZERO);
            this.playCtrl.setInputActive(false);
        }

        // 重置时间显示
        this._timeCounter = 0;
        if (this.timeLabel) {
            this.timeLabel.string = '时间: 0.0s';
        }
        this._timerEnabled = false;
    }

    // 开始计时
    startTimer() {
        this._startTime = Date.now();
        this._timerEnabled = true;
        this._timeCounter = 0;
    }

    // 结束计时
    stopTimer() {
        this._timerEnabled = false;
    }

    // 根据游戏步数判断是否结束游戏
    checkGameEnd(curStep: number) {
        console.log('checkGameEnd', curStep);

        if (this.scoreLabel) {
            this.scoreLabel.string = curStep.toString();
        }
        // 达到跑道尽头，游戏结束
        if (curStep >= this.roadLength) {
            this.titleLabel.string = `You Win!\n用时: ${this._timeCounter.toFixed(1)}秒`;
            // 延迟一点显示初始化界面
            this.curState = GameState.GS_INIT;

        }
        // 赛道上有坑，游戏结束
        else if (this._road[curStep] === BlockType.BT_NONE) {
            this.curState = GameState.GS_INIT;
            this.titleLabel.string = 'You Lose! \n Score: ' + curStep;
        }
    }

    // 监听游戏状态
    set curState(value: GameState) {
        if (this._curState === value) {
            return;
        }

        this._curState = value;
        switch (this._curState) {
            case GameState.GS_INIT:
                // 停止计时
                this.stopTimer();
                this.gameInit();
                break;
            case GameState.GS_PLAYING:
                if (this.menuNode) {
                    this.menuNode.active = false;
                }
                if (this.playCtrl) {
                    setTimeout(() => {
                        this.playCtrl.setInputActive(true);
                    }, 0.1);

                    // 开始计时
                    this.startTimer();
                }
                break;
            case GameState.GS_END:
                break;
        }
    }

    // 监听 Play 按键点击事件
    onPlayBtnClick() {
        this.curState = GameState.GS_PLAYING;
    }

    spawnBlockByType(type: BlockType) {
        if (!this.cubePrfb) {
            return null;
        }

        let block: Node | null = null;
        // 赛道类型为实路才生成
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb);
                break;
        }

        return block;
    }

    generateRoad() {
        // 移除旧跑道
        this.node.removeAllChildren();
        this._road = [];

        this._road.push(BlockType.BT_STONE);

        for (let i = 1; i < this.roadLength; i++) {
            // 如果上一个格子为坑，则下一个格子为实路
            if (this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_STONE);
            }
            // 否则，下一个格子有50%的概率为坑
            else {
                this._road.push(Math.random() > 0.5 ? BlockType.BT_NONE : BlockType.BT_STONE);
            }
        }

        this._road.push(BlockType.BT_STONE);

        // 渲染赛道
        for (let i = 0; i <= this.roadLength; i++) {
            let block: Node = this.spawnBlockByType(this._road[i]);
            if (block) {
                this.node.addChild(block);
                block.setPosition(i, -1.5, 0);
            }
        }

        console.log('generateRoad', this._road);
    }

    // 添加 update 方法以更新时间显示
    update(deltaTime: number) {
        // 游戏进行中更新计时器
        if (this._timerEnabled) {
            this._timeCounter += deltaTime;
            if (this.timeLabel) {
                this.timeLabel.string = `时间: ${this._timeCounter.toFixed(1)}s`;
            }
        }
    }
}