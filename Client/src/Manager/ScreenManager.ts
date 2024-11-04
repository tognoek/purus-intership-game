import * as pc from 'playcanvas';

import Manager from '../Core/Manager';
import RoomUI from '../Scenes/UI/Room/RoomUI';
import HomeUI from '../Scenes/UI/Home/HomeUI';
import UI from '../Scenes/UI/InterfaceUI';
import PlayUI from '../Scenes/UI/Play/PlayUI';
import LobbyUI from '../Scenes/UI/Lobby/Lobby';
import LoadUI from '../Scenes/UI/Load/LoadUI';
import EndUI from '../Scenes/UI/End/EndUI';

export default class ScreenManager {
    public status: string;
    private screen: pc.Entity;
    private listUI: UI[];
    private roomUI: UI;
    private homeUI: UI;
    private playUI: UI;
    private lobbyUI: UI;
    private loadUI: UI;
    private endUI: UI;

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
        this.lobbyUI = new LobbyUI(this.screen);
        this.loadUI = new LoadUI(this.screen);
        this.endUI = new EndUI(this.screen);
        this.listUI = [
            this.roomUI,
            this.homeUI,
            this.playUI,
            this.lobbyUI,
            this.loadUI,
            this.endUI,
        ];
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
            case 'lobby':
                this.lobbyUI.open();
                break;
            case 'load':
                this.loadUI.open();
                break;
            case 'end':
                this.endUI.open();
                break;
            default:
                this.homeUI.open();
                break;
        }
    }

    public updateDataInLobby(id: string, size: number, max: number) {
        (this.lobbyUI as LobbyUI).setText(id, size, max);
    }

    public updateHpPoint(hp: number, hpMax: number, score: number, point: number) {
        (this.playUI as PlayUI).setData(hp, hpMax, score, point);
    }

    public updateIdRoom(id: string) {
        (this.playUI as PlayUI).setIdRoom(id);
    }

    public lightLockAt(position: pc.Vec3) {
        (this.playUI as PlayUI).setLockAt(position);
    }

    public updateTimePlay(time: number) {
        (this.playUI as PlayUI).setTime(time);
    }

    public updateTimeLoad(time: number) {
        (this.loadUI as LoadUI).setTime(time);
    }

    public updateEnd(score: number, top: number) {
        (this.endUI as EndUI).update(score, top);
    }
}
