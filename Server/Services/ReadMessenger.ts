import Manager from '../Core/Manager';
import Messenger from './Messenger';

export default class ReadMessenger {
    constructor() {
        // new Read Messenger
    }

    public newRoom(msg: Messenger) {
        // const idRoom = (msg.getData() as { idRoom?: string })?.idRoom;
        let user = msg.getUser();
        Manager.gI().newRoom(user!);
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

    public playerAttack(idPlayer: string, angle: number) {
        this.applyVelocity(idPlayer, { x: 0, y: 0, z: 0 }, angle);
        Manager.gI().attack(idPlayer);
    }
}
