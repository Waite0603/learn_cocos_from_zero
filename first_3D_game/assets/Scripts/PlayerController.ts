import { _decorator, Component, Vec3, input, Input, EventMouse, Animation, SkeletalAnimation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
    @property(Animation)
    public BodyAnim: Animation = null!;

    @property({ type: SkeletalAnimation })
    public CocosAnim: SkeletalAnimation | null = null;

    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.44;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = new Vec3();
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    private _targetPos: Vec3 = new Vec3();
    private _curStep: number = 0;

    start() {
        // Your initialization goes here.
        // input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    setInputActive(active: boolean) {
        if (active) {
            console.log('setInputActive true');
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        } else {
            input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }
    }

    onMouseUp(event: EventMouse) {
        const step = event.getButton() === 0 ? 1 : event.getButton() === 2 ? 2 : 0;
        if (step > 0) {
            this.jumpByStep(step);
        }
    }

    jumpByStep(step: number) {
        if (this._startJump) return;

        this._startJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep / this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));

        if (this.CocosAnim) {
            this.CocosAnim.getState('cocos_anim_jump').speed = 3.5;
            this.CocosAnim.play('cocos_anim_jump');
        }
        
        this._curStep += step;
    }

    onJumpEnd() {
        if (this.CocosAnim) {
            this.CocosAnim.play('cocos_anim_idle');
        }
        this.node.emit('jump-end', this._curStep);
    }

    reset() {
        this._curStep = 0;
    }

    update(deltaTime: number) {
        if (this._startJump) {
            this._curJumpTime += deltaTime;
            if (this._curJumpTime > this._jumpTime) {
                this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onJumpEnd();
            } else {
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }
}