import Messange from '../Services/Messange';
import Session from '../Core/Session';
import Manager from '../Core/Manager';

export default class CreateMessege {
    private static instance: CreateMessege;

    public static getInstance(): CreateMessege {
        if (!this.instance) {
            this.instance = new CreateMessege();
        }
        return this.instance;
    }

    public newRoom(idRoom: string): Messange {
        return new Messange(0, { idRoom: idRoom });
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
