import { _decorator, Component, log, resources, Sprite, SpriteFrame, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    blueBulletPath: string = "images/bullet1/spriteFrame"

    orangeBulletPath: string = "images/bullet2/spriteFrame"

    speed: number;

    viewHeight: number = view.getVisibleSize().height;

    viewWidth: number = view.getVisibleSize().width;

    update(dt: number): void {
        this.node.setPosition(this.node.position.x, this.node.position.y + dt * this.speed)
        if (this.node.getPosition().y >= this.viewHeight / 2) {
            this.node.getParent().removeChild(this.node);
            this.node.destroy();
        }
    }

    initProperties(bulletType: number, speed: number) {
        if (bulletType == 1) {
            resources.load(this.blueBulletPath, (err, spriteFrame: SpriteFrame) => {
                if (!err) {
                    this.node.getComponent(Sprite).spriteFrame = spriteFrame
                }
            });
        } else if (bulletType) {
            resources.load(this.orangeBulletPath, (err, spriteFrame: SpriteFrame) => {
                if (!err) {
                    this.node.getComponent(Sprite).spriteFrame = spriteFrame
                }
            });
        }
        this.speed = speed;
    }
}


