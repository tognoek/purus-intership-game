import Manager from '../Core/Manager';
import Session from '../Core/Session';
import Messenger from './Messenger';

export default class ReadMessenger {
    constructor() {
        // new Read Messenger
    }

    public newRoom(msg: Messenger){
        const idRoom = (msg.getData() as { idRoom?: string })?.idRoom;
        Manager.gI().newRoom(idRoom!);
    }

    public joinRoom(msg: Messenger) {
        let user = msg.getUser();
        const idRoom = (msg.getData() as { idRoom?: string })?.idRoom;
        Manager.gI().joinRoom(idRoom!, user!);
    }

    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        Manager.gI().applyForce(idPlayer, force);
    }

    public applyVelocity(
        idPlayer: string,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        Manager.gI().applyVelocity(idPlayer, velocity, angle);
    }

    public playerAttack(idPlayer: string){
        Manager.gI().attack(idPlayer);
    }
}
