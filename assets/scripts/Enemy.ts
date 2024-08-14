import { _decorator, Component, log, resources, Sprite, SpriteFrame, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    // 生命值
    health: number;

    typeMap = { 0: "images/enemy1/spriteFrame", 1: "images/enemy2/spriteFrame", 2: "images/enemy3_n1/spriteFrame" }

    viewHeight: number = view.getVisibleSize().height;

    viewWidth: number = view.getVisibleSize().width;

    start() {
    }

    update(dt: number) {
    }

    init(type: number) {
        this.initProperties(this.typeMap[type])
    }

    initProperties(path: string) {
        resources.load(path, (err, frame: SpriteFrame) => {
            if (!err) {
                this.node.getComponent(Sprite).spriteFrame = frame;
                let width = this.node.getComponent(UITransform).contentSize.y
                this.node.setPosition(0, this.viewHeight / 2 - width / 2)
            }
        });
    }
}


