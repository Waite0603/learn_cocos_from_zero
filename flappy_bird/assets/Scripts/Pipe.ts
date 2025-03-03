import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    // 接收背景节点
    @property(Node)
    pipeUp: Node = null;
    @property(Node)
    pipeDown: Node = null;

    // 记录移动速度以及状态
    @property
    moveSpeed: number = 200; // 柱子移动速度
    private _canMove: boolean = false;

    start() {
        this._canMove = true;

    }

    update(deltaTime: number) {
        if (this._canMove === false) return;

        // 向左移动柱子
        const pos = this.node.getPosition();
        this.node.setPosition(pos.x - this.moveSpeed * deltaTime, pos.y, pos.z);
        
        // 如果柱子移出屏幕左侧，可以选择销毁它
        if (pos.x < -375) {
            this.node.destroy();
        }

        // 移动的距离
        const moveDis = this.moveSpeed * deltaTime;

        let pos1 = this.pipeUp.getPosition();
        let pos2 = this.pipeDown.getPosition();
        this.pipeUp.setPosition(pos1.x - moveDis, pos1.y);
        this.pipeDown.setPosition(pos2.x - moveDis, pos2.y);
        // console.log('pos1:', pos1, 'pos2:', pos2);

        // 判断是否移动出屏幕
        if (pos1.x <= 0) {
            pos1 = this.pipeUp.getPosition();
            this.pipeUp.setPosition(pos1.x + 375, pos1.y);
        }

        if (pos2.x <= 0) {
            pos2 = this.pipeDown.getPosition();
            this.pipeDown.setPosition(pos2.x + 375, pos2.y);
        }
    }
}


