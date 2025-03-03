import { _decorator, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody2D, Vec2 } from 'cc';
import { Tags } from './Tags';
import { GameManger } from './GameManger';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    // 监听游戏是否开始
    private _canControl: boolean = true;

    private rgd2D: RigidBody2D = null;

    // 小鸟旋转速度
    @property
    rotateSpeed: number = 60;

    protected start(): void {
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

        // 注销单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onTouchStart() {
        if (this._canControl == false) return;

        console.log('onTouchStart');
        this.rgd2D.linearVelocity = new Vec2(0, 10);
        // this.node.setRotationFromEuler(0, 0, 30);
        this.node.angle = 30;
    }


    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == Tags.LAND || otherCollider.tag == Tags.PIPE) {
            GameManger.instance.toOver();
        }
    }


    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == Tags.PIPE_MIDDLE) {
            GameManger.instance.addScore();
        }
    }

    // 控制开始状态
    public enableControl() {
        this.rgd2D.enabled = true;
        this._canControl = true;
    }

    public disableControl() {
        this.rgd2D.enabled = false;
        this._canControl = false;
    }

    // 禁用控制不禁用刚体
    public disableControlOnly() {
        this._canControl = false;
        this.rgd2D.enabled = true;
    }

    update(deltaTime: number) {
        if (this._canControl == false) return;

        this.node.angle -= this.rotateSpeed * deltaTime;

        if (this.node.angle < -60) {
            this.node.angle = -60;
        }

    }
}


