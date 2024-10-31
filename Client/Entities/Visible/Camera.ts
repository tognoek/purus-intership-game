import * as pc from 'playcanvas';

import Entity from '../Enity';
import {rotateAroundY} from '../../Utils/Math';
import Manager from '../../Core/Manager';

export default class Camera extends Entity {
    private camera: pc.Entity;
    private angle: number;
    private y: number;
    private minD: number = 20;
    private timeY: number;
    private timeX: number;

    constructor(id: string = 'camera', position: pc.Vec3 = new pc.Vec3()) {
        super(id, position);
        this.camera = new pc.Entity('camera');
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(0.5, 0.5, 0.5),
        });
        this.angle = 180;
        this.y = 1;
        this.timeY = Date.now()
        this.timeX = Date.now()
    }

    public getAngle(){
        return this.angle;
    }

    public getCamera() {
        return this.camera;
    }

    public update(targetPosition: pc.Vec3) {
        const targetCameraPosition = rotateAroundY(targetPosition, 0, -8, this.angle)
        const targetPositionPoint =  rotateAroundY(targetPosition, 0, 10, this.angle)
        targetCameraPosition.y += (this.y + 3);
        targetPositionPoint.y -= 2 * this.y;
        this.camera.setPosition(targetCameraPosition);
        this.camera.lookAt(targetPositionPoint);
        const point = rotateAroundY(targetPosition, 0, 5, this.angle);
        point.y += 1;
        Manager.gI().game.lockAtUser(targetPositionPoint)
    }
    public rotateVectorAroundX(dx: number) {
        if (Math.abs(dx) < this.minD / 2){
            return;
        }
        const time = Date.now();
        if (time - this.timeX < 20){
            return;
        }
        this.timeX = time;
        this.angle +=  (4 * (dx > 0 ? 1 : -1));
        if (this.angle > 360){
            this.angle -= 360;
        }
        if (this.angle < -360){
            this.angle += 360;
        }
    }

    public rotateVectorAroundY(dy: number) {
        if (Math.abs(dy) < this.minD){
            return;
        }
        const time = Date.now();
        if (time - this.timeY < 20){
            return;
        }
        this.timeY = time;
        this.y += 0.02 * (dy > 0 ? 1 : -1);
        // Session.gI().game.rotateUser({x: 0, y: -(dx / 100), z:0})
        if (this.y > 1){
            this.y = 1;
        }
        if (this.y < 0.5){
            this.y = 0.5;
        }
    }

    public addForApp(app: pc.Application) {
        app.root.addChild(this.camera);
    }
}
