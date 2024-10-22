import NetWork from './Network';
import Player from '../Entities/Invisible/Player';
import { getLocalIP } from '../Utils/OperatingSystem';
import Messange from '../Services/Messange';
import Manager from './Manager';

export default class Session{
    private static instance: Session;

    private connected = false;
    private netWork: NetWork;
    private host: string;
    private port: number;
    private idUser: string | null;

    private constructor() {
        this.host = getLocalIP();
        this.port = 5050;
        this.netWork = new NetWork();
        this.idUser = null;
    }

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }


    public setIdUser(id: string) {
        this.idUser = id;
    }

    public getIdUser(): string | null {
        return this!.idUser;
    }

    public getUser(): Player | undefined{
        if (!this.idUser){
            return undefined
        }
        return Manager.gI().game.getPlayer(this.idUser);
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
