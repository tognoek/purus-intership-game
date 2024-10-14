import Server from "./Server";
import Session from "./Session";

export default class ServerManager{
    private server: Server;

    constructor(){
        this.server = new Server();
        Session.getInstance().update();
        Session.getInstance().init().then(() => {
            console.log('Ammo loaded successfully');
        })
    }

    public update(){
        setInterval(() => {
            Session.getInstance().update();
            this.server.sendData();
        }, 1000 / 30)
    }

    // Các hàm 

}