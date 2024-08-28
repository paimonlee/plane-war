import { _decorator, Component, instantiate, Prefab } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property({ type: Prefab })
    private enemyPre: Prefab;

    private refreshEnemyInterval: number = 5;

    start() {
        this.schedule(() => { this.refreshEnemy() }, this.refreshEnemyInterval, Number.MAX_VALUE, 1)
    }

    refreshEnemy() {
        let enemy = instantiate(this.enemyPre);
        enemy.setParent(this.node)
        enemy.getComponent(Enemy).init()
    }
}


