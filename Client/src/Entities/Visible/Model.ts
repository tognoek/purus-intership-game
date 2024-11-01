import * as pc from 'playcanvas';

import Session from '../../Core/Session';
import { rotateAroundY } from '../../Utils/Math';
import Manager from '../../Core/Manager';

export default class Model {
    private id: string;
    private model: pc.Entity;
    private isAttack: boolean;
    private timeOutId: NodeJS.Timeout | null;
    constructor(id: string, model: pc.Entity) {
        this.id = id;
        this.isAttack = false;
        this.timeOutId = null;
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
        let player = Manager.gI().game.getPlayer(this.id);
        if (!player) {
            return;
        }
        if (this.isAttack){
            // if (player.isAttack()){
            //     if (this.timeOutId){
            //         clearTimeout(this.timeOutId);
            //         this.timeOutId = setTimeout(() => {
            //             this.isAttack = false;
            //             this.timeOutId = null;
            //             this.model.animation?.play(player.getStatus(), 0.2);
            //         }, ((this.model.animation?.duration ?? 0) - 0.2) * 1000);
            //     }
            // }
            return;
        }
        this.model.animation?.play(player.getStatus(), 0.2);
        if (player.isAttack()) {
            this.isAttack = true;
            this.timeOutId = setTimeout(() => {
                this.isAttack = false;
                this.timeOutId = null;
                this.model.animation?.play(player.getStatus(), 0.2);
            }, ((this.model.animation?.duration ?? 0) - 0.2) * 1000);
        }
    }
    public updateAngle(id: string, position: pc.Vec3, angle: number) {
        if (Session.gI().getIdUser() == id) {
            return;
        }
        const targetPosition = rotateAroundY(position, 0, 10, angle);
        this.model.lookAt(targetPosition);
    }

    public rotate(angle: { x: number; y: number; z: number }) {
        this.model.setEulerAngles(angle.x, angle.y, angle.z);
    }

    public lookAt(position: pc.Vec3) {
        this.model.lookAt(position);
    }
}
