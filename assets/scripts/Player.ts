import { _decorator, Component, EventTouch, Input, instantiate, log, Node, Prefab, resources, Sprite, SpriteFrame, UITransform, Vec3, view } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    private readonly playerType1: string = "images/me1/spriteFrame"
    private readonly playerType2: string = "images/me2/spriteFrame"

    private isSelected: boolean;

    private readonly screenHeight: number = view.getVisibleSize().height;

    private readonly screenWidth: number = view.getVisibleSize().width;

    private playerHeight: number;

    private playerWidth: number;

    @property({ type: Prefab })
    private bulletPrefab: Prefab;

    @property
    private bulletSpeed: number = 100;

    private readonly bulletType: number = 0;
    private readonly fireCDInterval: number = 1;
    private readonly changeInterval: number = 1;
    private playerType = 1;

    init() {
        this.playerHeight = this.node.getComponent(UITransform).contentSize.height;
        this.playerWidth = this.node.getComponent(UITransform).contentSize.width;
        this.node.setPosition(0, -this.screenHeight / 2 + this.playerHeight)
        this.loadMe(this.playerType1);
    }

    start() {
        this.init()
        this.registeEvent()
        this.schedule(() => { this.fire(); }, this.fireCDInterval);
        this.schedule(() => { this.changeMe(); }, this.changeInterval);
    }

    fire() {
        let bulletNode: Node = instantiate(this.bulletPrefab)
        let bulletComp = bulletNode.getComponent(Bullet)
        this.node.getParent().addChild(bulletNode)
        bulletNode.setParent(this.node.getParent())
        bulletComp.initProperties(this.bulletType, this.bulletSpeed)
        let currPosition = this.node.getPosition()
        bulletNode.setPosition(currPosition.x, currPosition.y + this.playerHeight / 2)
    }

    loadMe(path: string) {
        resources.load(path, (err, frame: SpriteFrame) => {
            if (!err) {
                this.node.getComponent(Sprite).spriteFrame = frame;
            }
        })
    }

    changeMe(): any {
        if (this.playerType == 1) {
            this.playerType = 2;
            this.loadMe(this.playerType2);
        } else {
            this.playerType = 1;
            this.loadMe(this.playerType1);
        }
    }

    registeEvent() {
        this.node.on(Input.EventType.TOUCH_START, (event: EventTouch) => {
            this.isSelected = true;
        }, this);
        this.node.on(Input.EventType.TOUCH_MOVE, (event: EventTouch) => {
            if (this.isSelected) {
                let uiLocation = event.getUILocation();
                let position = this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(uiLocation.x, uiLocation.y, 0));
                if (position.y < -this.screenHeight / 2
                    || position.x < -this.screenWidth / 2
                    || position.y > this.screenHeight / 2
                    || position.x > this.screenWidth / 2) {
                    this.isSelected = false;
                }
                this.node.setPosition(position)
            }
        }, this);
        this.node.on(Input.EventType.TOUCH_END, (event: EventTouch) => {
            this.isSelected = false;
        }, this);
    }
}


