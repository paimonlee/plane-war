import { _decorator, Component, EventMouse, log, Node, NodeEventType, Size, UITransform, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({ type: Node })
    backgroud_1: Node;

    @property({ type: Node })
    backgroud_2: Node;

    private viewHeight: number;
    private viewWidth: number;

    moveSpeed: number = 100;

    start() {
        this.init()
    }

    init() {
        this.viewHeight = view.getVisibleSize().height;
        this.viewWidth = view.getVisibleSize().width;

        this.backgroud_2.getComponent(UITransform).setContentSize(new Size(this.viewWidth, this.viewHeight));
        this.backgroud_1.getComponent(UITransform).setContentSize(new Size(this.viewWidth, this.viewHeight));
        this.backgroud_2.setPosition(0, 0);
        this.backgroud_1.setPosition(0, this.backgroud_2.position.y + this.viewHeight);
    }

    update(deltaTime: number) {
        this.backgroud_1.setPosition(this.backgroud_1.position.x, this.backgroud_1.position.y - this.moveSpeed * deltaTime);
        this.backgroud_2.setPosition(this.backgroud_2.position.x, this.backgroud_2.position.y - this.moveSpeed * deltaTime);
        if (this.backgroud_1.position.y < -this.viewHeight) {
            this.backgroud_1.setPosition(0, this.backgroud_2.position.y + this.viewHeight);
        } else if (this.backgroud_2.position.y < -this.viewHeight) {
            this.backgroud_2.setPosition(0, this.backgroud_1.position.y + this.viewHeight);
        }
    }
}


