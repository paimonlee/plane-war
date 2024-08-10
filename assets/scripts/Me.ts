import { _decorator, Component, EventTouch, Input, NodeEventType, UITransform, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Me')
export class Me extends Component {
    private touchDown: boolean;

    viewHeight: number = view.getVisibleSize().height;
    viewWidth: number = view.getVisibleSize().width;

    start() {
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

    update(deltaTime: number) {

    }
}


