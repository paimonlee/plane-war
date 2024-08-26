import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, log, PhysicsSystem2D, PolygonCollider2D, resources, Sprite, SpriteFrame, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    // 生命值
    health: number = 10;

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

        let collider2D = this.node.getComponent(Collider2D)
        collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 0) {
            this.health -= 1;
        }
    }
}


