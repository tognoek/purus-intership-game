import Game from '../Core/Game';
import GameCanvas from '../Core/GameCanvas';
import Camera from '../Entities/Camera';
import NetWork from '../Entities/Network';
import CreateModel from '../Script/CreateModle';
import { getLocalIP } from '../Utils/OperatingSystem';
import ISession from './ISession';
import Messange from './Messange';

export default class Session implements ISession {
    private connected = false;
    private static instance: Session;
    private netWork: NetWork;
    private host: string;
    private port: number;
    private idUser: string | null;
    public game: Game;
    public gameCanvas: GameCanvas | null;
    public camera: Camera | null;

    private constructor() {
        this.game = new Game();
        this.host = getLocalIP();
        this.port = 5050;
        this.netWork = new NetWork();
        this.idUser = null;
        this.gameCanvas = null;
        this.camera = null;
    }

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public setCamera(camera: Camera){
        this.camera = camera;
    }

    public setGameCanvas(gameCanvas: GameCanvas) {
        this.gameCanvas = gameCanvas;
    }

    public setIdUser(id: string) {
        this.idUser = id;
    }

    public getIdUser(): string | null {
        return this.idUser;
    }

    public isConnected(): boolean {
        return this.connected;
    }
    public connect(): void {
        this.connected = this.netWork.connect(this.host, this.port);
        if (this.connected) {
            this.netWork.onMessenger();
        } else {
            console.log('Connection failed');
        }
    }
    public send(message: Messange): void {
        this.netWork.handlerSend(message);
    }
    public close(): void {
        this.netWork.disconnect();
    }
}
