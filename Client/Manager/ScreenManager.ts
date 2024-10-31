import * as pc from 'playcanvas';

import Manager from '../Core/Manager';
import RoomUI from '../Scenes/UI/Room/RoomUI';
import HomeUI from '../Scenes/UI/Home/HomeUI';
import UI from '../Scenes/UI/InterfaceUI';
import PlayUI from '../Scenes/UI/Play/PlayUI';
import LobbyUI from '../Scenes/UI/Lobby/Lobby';

export default class ScreenManager {
    public status: string;
    private screen: pc.Entity;
    private listUI: UI[];
    private roomUI: UI;
    private homeUI: UI;
    private playUI: UI;
    private lobbyUI: UI;

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
        this.listUI = [this.roomUI, this.homeUI, this.playUI, this.lobbyUI];
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
            default:
                this.homeUI.open();
                break;
        }
    }

    public updateDataInLobby(id: string, size: number, max: number){
        (this.lobbyUI as LobbyUI).setText(id, size, max);
    }

    public updateHpPoint(hp: number, hpMax: number, score: number) {
        (this.playUI as PlayUI).setData(hp, hpMax, score);
    }

    public updateIdRoom(id: string) {
        (this.playUI as PlayUI).setIdRoom(id);
    }

    public lightLockAt(position: pc.Vec3){
        (this.playUI as PlayUI).setLockAt(position);
    }
}
