import Ammo from 'ammojs-typed';
import Server from './Server';
import Manager from './Manager';

export default class Session {
    private static instance: Session;
    private ammo!: typeof Ammo;
    private server: Server;

    private constructor() {
        this.server = new Server();
    }

    public setUpServer(){
        this.server.setupListeners();
    }

    public clearServer(){
        this.server.close();
    }

    public resetServer(){
        this.server.reset();
    }

    public loop(){
        setInterval(() => {
            Manager.gI().worldManager.update();
            this.server.senData();
        }, 1000/ 30);
    }

    public static gI(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public async init() {
        this.ammo = await Ammo();
    }

    public getAmmo() {
        return this.ammo;
    }
}
