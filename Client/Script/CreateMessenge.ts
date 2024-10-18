import Messange from '../Services/Messange';
import Session from '../Services/Session';

export default class CreateMessege {
    private static instance: CreateMessege;

    public static getInstance(): CreateMessege {
        if (!this.instance) {
            this.instance = new CreateMessege();
        }
        return this.instance;
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
            angle: Session.getInstance().camera?.getAngle(),
        });
    }
    public attack() {
        return new Messange(13, { force: 'attack' });
    }
}
