import * as pc from 'playcanvas';

import Entity from '../Enity';

export default class Player extends Entity {
    private name: string;
    private status: string;
    constructor(id: string, position: pc.Vec3, name: string) {
        super(id, position);
        this.name = name;
        this.status = 'idle';
    }

    public setPosition(position: { x: number; y: number; z: number }) {
        super.setPosition(new pc.Vec3(position.x, position.y, position.z));
    }

    public setStatus(status: string): boolean {
        if (this.status != status) {
            this.status = status;
            return true;
        }
        return false;
    }

    public isAttack(){
        return this.status == 'attack';
    }

    public getStatus(): string {
        return this.status;
    }
}
