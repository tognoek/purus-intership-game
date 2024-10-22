import * as pc from 'playcanvas';

import Manager from '../Core/Manager';
import PlayUI from '../Scenes/UI/PlayUI';
import LoadData from '../Script/LoadData';

export default class ScreenManager {
    private play: PlayUI;
    private status: string;
    private screen: pc.Entity;

    constructor() {
        this.screen = new pc.Entity();
        this.screen.addComponent('screen', {
            referenceResolution: new pc.Vec2(window.innerWidth, window.innerHeight),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });
        this.status = 'home';
        this.play = new PlayUI(this.screen);
        Manager.gI().canvas.addChild(this.screen);
    }

    public updateHpPoint(hp: number, point: number){
        this.play.updateHp(hp);
        this.play.updatePoint(point);
    }
}
