import * as pc from 'playcanvas';

import Entity from './Enity';
import {rotateAroundY} from '../Utils/Math';
import Session from '../Services/Session';

export default class Camera extends Entity {
    private target: string;
    private camera: pc.Entity;
    private angle: number;
    private y: number;
    private minD: number = 20;
    private time: number;

    constructor(id: string, position: pc.Vec3, target: string) {
        super(id, position);
        this.target = target;
        this.camera = new pc.Entity('camera');
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(0.5, 0.5, 0.5), // Màu nền của camera
        });
        this.angle = 180;
        this.y = 1;
        this.time = Date.now()
    }

    public getTarget(): string {
        return this.target;
    }

    public getAngle(){
        return this.angle;
    }
    public setTarget(id: string) {
        this.target = id;
    }

    public getCamera() {
        return this.camera;
    }

    public update(targetPosition: pc.Vec3) {
        const targetCameraPosition = rotateAroundY(targetPosition, -2, -5, this.angle)
        const targetPositionPoint =  rotateAroundY(targetPosition, 0, 10, this.angle)
        targetCameraPosition.y += this.y;
        targetPositionPoint.y -= 2 * this.y;
        this.camera.setPosition(targetCameraPosition);
        this.camera.lookAt(targetPositionPoint);
        const point = rotateAroundY(targetPosition, 0, 5, this.angle);
        point.y += 1;
        Session.getInstance().game.lockAtUser(targetPositionPoint)
        Session.getInstance().gameCanvas?.setPositionDot(point);
    }
    public rotateVectorAroundX(dx: number) {
        if (Math.abs(dx) < this.minD / 2){
            return;
        }
        this.angle +=  0.05 * (dx > 0 ? 1 : -1);
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
        if (time - this.time < 20){
            return;
        }
        this.time = time;
        this.y += 0.02 * (dy > 0 ? 1 : -1);
        // Session.getInstance().game.rotateUser({x: 0, y: -(dx / 100), z:0})
        if (this.y > 2){
            this.y = 2;
        }
        if (this.y < 0){
            this.y = 0;
        }
    }

    public addForApp(app: pc.Application) {
        app.root.addChild(this.camera);
    }
}
