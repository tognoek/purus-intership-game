import NetWork from '../Entities/Network';
import ISession from './ISession';
import Messange from './Messange';

export default class Session implements ISession {
    private connected = false;
    private static instance: Session;
    private netWork: NetWork;
    private host: string;
    private port: number;
    private idUser: string | null;

    private constructor() {
        this.host = '192.168.0.93';
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
