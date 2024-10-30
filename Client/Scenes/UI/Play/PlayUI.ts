import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import TextBasic from '../../Config/TextBasic';
import Ground from '../../../Entities/Visible/Ground';
import Light from '../../../Entities/Visible/Light';
import HealthBar from './HealthBar';

export default class PlayUI implements UI {
    private screen: pc.Entity;
    private textShow: TextBasic | null;
    private healthBar: HealthBar;
    private group: Ground;
    private light: Light;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.textShow = null;
        this.healthBar = new HealthBar(100, 100, { width: 300, height: 80 });
        this.group = new Ground();
        this.light = new Light();
        this.init();
    }

    public setLockAt(position: pc.Vec3) {
        this.light.setLockAt(position);
    }

    private init() {
        this.textShow = new TextBasic({ width: 240, height: 80 }, '');
        this.textShow.setSize(70);
        this.textShow.setLocalPosition(0, 160, 0);
        this.healthBar.setLocalPosition(
            -this.screen.screen!.referenceResolution.x / 2 + 260,
            this.screen.screen!.referenceResolution.y / 2 - 60,
            0
        );
        this.screen.addChild(this.textShow);
        this.screen.addChild(this.healthBar);
    }

    public setData(hp: number, maxHp: number, score: number){
        this.healthBar.setTextScore(score);
        this.healthBar.setHp(hp, maxHp);
    }

    public setIdRoom(id: string){
        this.healthBar.setTextRoom(id);
    }

    close(): void {
        this.textShow!.enabled = false;
        this.healthBar.enabled = false;
        this.group.close();
        this.light.close();
    }
    open(): void {
        this.textShow!.enabled = true;
        this.healthBar.enabled = true;
        this.group.open();
        this.light.open();
    }
}
