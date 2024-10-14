import Session from '../Core/Session';
import Messenger from './Messenger';
import Models from '../Core/Models';

export default class ReadMessenger {
    constructor() {
        // new Read Messenger
    }

    public joinRoom(msg: Messenger) {
        let user = msg.getUser();
        const roomId = (msg.getData() as { idRoom?: string })?.idRoom;
        Session.getInstance().joinRoom(roomId, user || null);
    }

    public aplyForce(idPlayer: string,force: { x: number, y: number, z: number }) {
        Session.getInstance().applyForce(idPlayer, force);
    }
}
