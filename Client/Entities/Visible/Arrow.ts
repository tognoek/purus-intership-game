import * as pc from 'playcanvas';
import { rotateAroundY } from '../../Utils/Math';

export default class Arrow {
    private id: string;
    private enity: pc.Entity;
    constructor(id: string, enity: pc.Entity) {
        this.id = id;
        this.enity = enity;
    }

    public getId() {
        return this.id;
    }

    public getEnity() {
        return this.enity;
    }

    public setPosition(position: { x: number; y: number; z: number }) {
        this.enity.setPosition(new pc.Vec3(position.x, position.y, position.z));
    }

    public lookAt(position: { x: number; y: number; z: number }, angle: number) {
        let pos = rotateAroundY(new pc.Vec3(position.x, position.y, position.z), 0, -10, angle);
        console.log(pos, position, angle);
        this.enity.lookAt(pos);
        this.enity.setEulerAngles(90, 0, 0);
    }
}
