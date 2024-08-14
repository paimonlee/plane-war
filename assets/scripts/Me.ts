import { _decorator, Component, EventTouch, Input, instantiate, log, Node, Prefab, resources, Sprite, SpriteFrame, UITransform, Vec3, view } from 'cc';
import { Bullet } from './Bullet';
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

    bulletSpeed: number = 100;

    fireCD: boolean = false;

    fireCDInterval: number = 1;

    fireTimer: number = 0;

    init() {
        this.initProperties()
    }

    initProperties() {
        this.meHeight = this.node.getComponent(UITransform).contentSize.height;
        this.meWidth = this.node.getComponent(UITransform).contentSize.width;
        this.node.setPosition(0, -this.viewHeight / 2 + this.meHeight)
        this.loadMe(this.me2);
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
    }

    fire() {
        let bulletNode: Node = instantiate(this.bulletPrefab)
        let bulletComp = bulletNode.getComponent(Bullet)
        this.node.getParent().addChild(bulletNode)
        bulletComp.initProperties(Math.round(Math.random()), this.bulletSpeed)
        let currPosition = this.node.getPosition()
        bulletNode.setPosition(currPosition.x, currPosition.y + this.meHeight / 2)
    }

    loadMe(path: string) {
        resources.load(path, (err, frame: SpriteFrame) => {
            if (!err) {
                this.node.getComponent(Sprite).spriteFrame = frame;
            }
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


