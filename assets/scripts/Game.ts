import { _decorator, Component, EventMouse, instantiate, log, Node, NodeEventType, Prefab, Size, UITransform, Vec3, view } from 'cc';
import { Enemy } from './Enemy';
import { Me } from './Me';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({ type: Node })
    backgroud1: Node;

    @property({ type: Node })
    backgroud2: Node;

    @property({ type: Prefab })
    mePrefab: Prefab;

    @property({ type: Prefab })
    enemyPrefab: Prefab;

    viewHeight: number;

    viewWidth: number;

    moveSpeed: number = 100;

    start() {
        this.init()
        let me = instantiate(this.mePrefab);
        let enemy = instantiate(this.enemyPrefab);
        this.node.addChild(me)
        this.node.addChild(enemy)
        me.getComponent(Me).init()
        enemy.getComponent(Enemy).init(Math.round(Math.random() * 2))
    }

    init() {
        this.viewHeight = view.getVisibleSize().height;
        this.viewWidth = view.getVisibleSize().width;

        this.backgroud2.getComponent(UITransform).setContentSize(new Size(this.viewWidth, this.viewHeight));
        this.backgroud1.getComponent(UITransform).setContentSize(new Size(this.viewWidth, this.viewHeight));
        this.backgroud2.setPosition(0, 0);
        this.backgroud1.setPosition(0, this.backgroud2.position.y + this.viewHeight);
    }

    update(deltaTime: number) {
        this.backgroud1.setPosition(this.backgroud1.position.x, this.backgroud1.position.y - this.moveSpeed * deltaTime);
        this.backgroud2.setPosition(this.backgroud2.position.x, this.backgroud2.position.y - this.moveSpeed * deltaTime);
        if (this.backgroud1.position.y < -this.viewHeight) {
            this.backgroud1.setPosition(0, this.backgroud2.position.y + this.viewHeight);
        } else if (this.backgroud2.position.y < -this.viewHeight) {
            this.backgroud2.setPosition(0, this.backgroud1.position.y + this.viewHeight);
        }
    }
}


