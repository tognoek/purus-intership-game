import Messange from '../Services/Messange';
import Manager from '../Core/Manager';

export default class CreateMessege {
    private static instance: CreateMessege;

    public static getInstance(): CreateMessege {
        if (!this.instance) {
            this.instance = new CreateMessege();
        }
        return this.instance;
    }

    public newRoom(id: string): Messange {
        return new Messange(0, { idRoom: id });
    }

    public leaveRoom(msg: string): Messange {
        return new Messange(3, { msg: msg });
    }

    public joinRoom(idRoom: string): Messange {
        return new Messange(1, { idRoom: idRoom });
    }
    public jump(x: number, y: number, z: number) {
        return new Messange(11, { force: { x: x, y: y, z: z } });
    }

    public movent(x: number, y: number, z: number) {
        return new Messange(12, {
            velocity: { x: x, y: y, z: z },
            angle: Manager.gI().angleLockAt(),
        });
    }
    public attack() {
        return new Messange(13, { angle: Manager.gI().angleLockAt() });
    }
}
