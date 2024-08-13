import { _decorator, Component, EventKeyboard, EventTouch, input, Input, instantiate, KeyCode, log, Node, Prefab, resources, Sprite, SpriteFrame, UI, UITransform, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Me')
export class Me extends Component {
    readonly me1: string = "images/me1/spriteFrame"

    readonly me2: string = "images/me2/spriteFrame"

    readonly loadMeInterval = 0.5;

    touchDown: boolean;

    viewHeight: number = view.getVisibleSize().height;

    viewWidth: number = view.getVisibleSize().width;

    currMeType = 1;

    loadMeWait: number = 0;

    meHeight: number;

    meWidth: number;

    @property({ type: Prefab })
    bulletPrefab: Prefab;

    bullets: Array<Node> = new Array<Node>();

    bulletSpeed: number = 100;

    fireCD: boolean = false;

    fireCDInterval: number = 1;

    fireTimer: number = 0;

    initProperties() {
        this.meHeight = this.node.getComponent(UITransform).contentSize.height;
        this.meWidth = this.node.getComponent(UITransform).contentSize.width;
    }

    start() {
        this.initProperties()
        this.registeEvent()
    }

    update(dt: number) {
        this.loadMeWait += dt;
        if (this.loadMeWait >= this.loadMeInterval) {
            if (this.currMeType == 1) {
                this.loadMe(this.me2);
                this.currMeType = 2;
            } else {
                this.loadMe(this.me1);
                this.currMeType = 1;
            }
            this.loadMeWait = 0;
        }
        if (!this.fireCD) {
            this.fire();
            this.fireCD = true;
            setTimeout(() => this.fireCD = false, this.fireCDInterval * 1000);
        }
        for (let bullet of this.bullets) {
            let position = bullet.getPosition();
            bullet.setPosition(position.x, position.y + dt * this.bulletSpeed);
        }
        this.bullets = this.bullets.filter((bullet) => {
            let destory: boolean = false;
            if (bullet.getPosition().y >= this.viewHeight / 2) {
                bullet.getParent().removeChild(bullet);
                bullet.destroy();
                destory = true;
            }
            return !destory;
        })
    }

    fire() {
        let bullet: Node = instantiate(this.bulletPrefab)
        let currPosition = this.node.getPosition()
        this.node.getParent().addChild(bullet)
        bullet.setPosition(currPosition.x, currPosition.y + this.meHeight / 2)
        this.bullets.push(bullet)
    }

    loadMe(path: string) {
        resources.load(path, (err, frame: SpriteFrame) => {
            if (err) {
                log("load me failed.%s", err)
                return;
            }
            this.node.getComponent(Sprite).spriteFrame = frame;
        })
    }

    registeEvent() {
        this.node.on(Input.EventType.TOUCH_START, (event: EventTouch) => {
            this.touchDown = true;
        }, this);
        this.node.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            if (this.touchDown) {
                let uiLocation = event.getUILocation();
                let position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(uiLocation.x, uiLocation.y, 0));
                if (position.y < -this.viewHeight / 2
                    || position.x < -this.viewWidth / 2
                    || position.y > this.viewHeight / 2
                    || position.x > this.viewWidth / 2) {
                    this.touchDown = false;
                }
                this.node.setPosition(position)
            }
        }, this);
        this.node.on(Input.EventType.TOUCH_END, (event: EventTouch) => {
            this.touchDown = false;
        }, this);
    }
}


