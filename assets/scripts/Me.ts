import { _decorator, Component, EventTouch, ImageAsset, Input, log, NodeEventType, resources, sp, Sprite, SpriteFrame, Texture2D, UITransform, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Me')
export class Me extends Component {
    readonly me1: string = "images/me1/spriteFrame"

    readonly me2: string = "images/me2/spriteFrame"

    readonly loadMeInterval = 0.5;

    private touchDown: boolean;

    private viewHeight: number = view.getVisibleSize().height;

    private viewWidth: number = view.getVisibleSize().width;

    private currMe = 1;

    private loadMeWait: number = 0;

    start() {
        this.registeEvent()
    }

    update(deltaTime: number) {
        this.loadMeWait += deltaTime;
        if (this.loadMeWait >= this.loadMeInterval) {
            if (this.currMe == 1) {
                this.loadMe(this.me2);
                this.currMe = 2;
            } else {
                this.loadMe(this.me1);
                this.currMe = 1;
            }
            this.loadMeWait = 0;
        }
    }

    private loadMe(url: string) {
        resources.load(url, (err, frame: SpriteFrame) => {
            if (err) {
                log("load me failed.%s", err)
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


