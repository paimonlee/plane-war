import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    // 1 橙色子弹
    // 2 蓝色子弹
    type: number;
    
    start() {

    }

    update(deltaTime: number) {

    }
}


