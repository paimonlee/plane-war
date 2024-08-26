import { _decorator, Component, instantiate, Prefab } from 'cc';
import { Enemy } from './Enemy';
import { Me } from './Me';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({ type: Prefab })
    enemyPrefab: Prefab;

    moveSpeed: number = 100;

    start() {
        let enemy = instantiate(this.enemyPrefab);
        this.node.addChild(enemy)
        enemy.getComponent(Enemy).init(Math.round(Math.random() * 2))
    }

    update(deltaTime: number) {

    }
}


