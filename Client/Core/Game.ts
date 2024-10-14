import { Camera } from "playcanvas";

import Player from "../Entities/Player";
import Messange from "../Services/Messange";
import Session from "../Services/Session";
import CreateMessege from "../Script/CreateMessenge";

export default class Game{
    private camera: Camera;
    private players: Map<string, Player>;
    private status: string;

    constructor(){
        this.camera = new Camera();
        this.players = new Map();
        this.status = 'home';
        window.addEventListener('keydown', this.controller);
    }

    controller(event: KeyboardEvent){
        let message: Messange;
        switch (event.key) {
            case 'y':
                message = CreateMessege.getInstance().joinRoom('1403');
                break;
            default:
                message = new Messange(3105, {tognoek: '3105'});
                break;
        }
        Session.getInstance().send(message);
    }
}