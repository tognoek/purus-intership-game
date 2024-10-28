import * as pc from 'playcanvas';

import Manager from '../Core/Manager';
import RoomUI from '../Scenes/UI/Room/RoomUI';
import HomeUI from '../Scenes/UI/Home/HomeUI';
import UI from '../Scenes/UI/InterfaceUI';
import PlayUI from '../Scenes/UI/Play/PlayUI';

export default class ScreenManager {
    public status: string;
    private screen: pc.Entity;
    private listUI: UI[];
    private roomUI: UI;
    private homeUI: UI;
    private playUI: UI;

    constructor() {
        this.screen = new pc.Entity();
        this.screen.addComponent('screen', {
            referenceResolution: new pc.Vec2(window.innerWidth, window.innerHeight),
            scaleBlend: 0.5,
            scaleMode: pc.SCALEMODE_BLEND,
            screenSpace: true,
        });
        this.status = '';
        this.roomUI = new RoomUI(this.screen);
        this.homeUI = new HomeUI(this.screen);
        this.playUI = new PlayUI(this.screen);
        this.listUI = [this.roomUI, this.homeUI];
        Manager.gI().canvas.addChild(this.screen);
        this.updateStatus('home');
    }

    public updateStatus(status: string) {
        if (status != this.status) {
            this.status = status;
            this.updateScreen();
        }
    }
    private closeAll() {
        this.listUI.forEach((ui) => {
            ui.close();
        });
        Manager.gI().getApp().render();
        Manager.gI().getApp().resizeCanvas();
    }
    private updateScreen() {
        this.closeAll();
        switch (this.status) {
            case 'home':
                this.homeUI.open();
                break;
            case 'room':
                this.roomUI.open();
                break;
            case 'play':
                this.playUI.open();
                break;
            default:
                this.homeUI.open();
                break;
        }
    }

    public updateHpPoint(hp: number, point: number) {
        // this.play.updateHp(hp);
        // this.play.updatePoint(point);
    }
}
