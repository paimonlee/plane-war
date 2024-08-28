import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, log, PhysicsSystem2D, PolygonCollider2D, resources, Sprite, SpriteFrame, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    // 生命值
    private health: number = 2;
    private speed: number = 150;

    private readonly uri: string = "images/enemy1/spriteFrame";

    private readonly downFrames: string[] = ["images/enemy1_down1/spriteFrame",
        "images/enemy1_down2/spriteFrame",
        "images/enemy1_down3/spriteFrame",
        "images/enemy1_down4/spriteFrame"];

    private readonly screenHeight: number = view.getVisibleSize().height;
    private readonly screenWidth: number = view.getVisibleSize().width;

    start() {
    }

    update(dt: number) {
        let position = this.node.getPosition()
        this.node.setPosition(position.x, position.y - this.speed * dt)
    }

    init() {
        resources.load(this.uri, (err, frame: SpriteFrame) => {
            if (!err) {
                this.node.getComponent(Sprite).spriteFrame = frame;
            }
        });
        this.node
            .getComponent(Collider2D)
            .on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        let height = this.node.getComponent(UITransform).contentSize.y
        let widthStart = -this.screenWidth / 2;
        let x = Math.round(Math.random() * 9 + 1);
        this.node.setPosition(widthStart + this.screenWidth / 10 * x, this.screenHeight / 2 + height / 2)
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 0) {
            this.health -= 1;
            if (this.health == 0) {
                setTimeout(() => {
                    // this.downFrames.forEach((value) => {
                    //     resources.load(value, (err, frame: SpriteFrame) => {
                    //         if (!err) {
                    //             log(this.node)
                    //             this.node.getComponent(Sprite).spriteFrame = frame;
                    //         }
                    //     });
                    // })
                    this.node.removeFromParent()
                    this.node.destroy()
                }, 1)
            }
        }
    }
}


