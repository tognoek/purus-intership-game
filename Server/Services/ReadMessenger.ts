import Session from "../Core/Session";
import Messenger from "./Messenger";
import Models from "../Core/Models";

export default class ReadMessenger{
    constructor(){
        Models.getInstance().init();
        // new Read Messenger
    }

    public joinRoom(msg: Messenger){
        let user = msg.getUser();
        const roomId = (msg.getData() as { idRoom?: string })?.idRoom;
        Session.getInstance().joinRoom(roomId, user || null);
    }

    public addModels(msg: Messenger){
    }
}