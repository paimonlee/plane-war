import { _decorator, Component, Node, Size, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Backgroud')
export class Backgroud extends Component {
    @property({ type: Node })
    private backgroud1: Node | null;
    @property({ type: Node })
    private backgroud2: Node | null;

    private screenHeight: number;
    private screenWidth: number;
    private moveSpeed: number = 100;

    start() {
        this.init();
    }

    init() {
        this.screenHeight = view.getVisibleSize().height;
        this.screenWidth = view.getVisibleSize().width;

        this.backgroud2.getComponent(UITransform).setContentSize(new Size(this.screenWidth, this.screenHeight));
        this.backgroud1.getComponent(UITransform).setContentSize(new Size(this.screenWidth, this.screenHeight));
        this.backgroud2.setPosition(0, 0);
        this.backgroud1.setPosition(0, this.backgroud2.position.y + this.screenHeight);
    }

    update(deltaTime: number) {
        this.backgroud1.setPosition(this.backgroud1.position.x, this.backgroud1.position.y - this.moveSpeed * deltaTime);
        this.backgroud2.setPosition(this.backgroud2.position.x, this.backgroud2.position.y - this.moveSpeed * deltaTime);
        if (this.backgroud1.position.y < -this.screenHeight) {
            this.backgroud1.setPosition(0, this.backgroud2.position.y + this.screenHeight);
        } else if (this.backgroud2.position.y < -this.screenHeight) {
            this.backgroud2.setPosition(0, this.backgroud1.position.y + this.screenHeight);
        }
    }
}


