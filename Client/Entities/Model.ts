import * as pc from 'playcanvas';
import Session from '../Services/Session';
import { rotateAroundY } from '../Utils/Math';

export default class Model {
    private id: string;
    private model: pc.Entity;
    constructor(id: string, model: pc.Entity) {
        this.id = id;
        this.model = model;
        this.model.setLocalScale(1, 1, -1);
    }

    public destroy() {
        this.model.destroy();
    }

    public setPosition(position: { x: number; y: number; z: number }) {
        this.model.setPosition(position.x, position.y, position.z);
    }

    public updateAnimation() {
        let player = Session.getInstance().game.getPlayer(this.id);
        if (!player) {
            return;
        }
        this.model.animation?.play(player.getStatus(), 0.2);
    }

    public updateAngle(id: string,position: pc.Vec3, angle: number) {
        if (Session.getInstance().getIdUser() == id){
            return;
        }
        const targetPosition =  rotateAroundY(position, 0, 10, angle)
        this.model.lookAt(targetPosition);
    }

    public rotate(angle: { x: number; y: number; z: number }) {
        this.model.setEulerAngles(angle.x, angle.y, angle.z);
    }

    public lookAt(position: pc.Vec3) {
        this.model.lookAt(position);
    }
}
