import { _decorator, Component, Input, input, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // 监听游戏是否开始
    private _canControl: boolean = true;

    private rgd2D:RigidBody2D = null;

    // 小鸟旋转速度
    @property
    rotateSpeed:number = 30;

    protected start(): void {
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        if (this._canControl == false) return;

        console.log('onTouchStart');
        this.rgd2D.linearVelocity = new Vec2(0, 10);
        // this.node.setRotationFromEuler(0, 0, 30);
        this.node.angle = 30; 
    }



    update(deltaTime: number) {
        this.node.angle -= this.rotateSpeed * deltaTime;

    }
}


