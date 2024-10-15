import * as pc from 'playcanvas';
import CreateModel from '../Script/CreateModle';
import Session from '../Services/Session';

export default class GameCanvas {
    private app: pc.Application;

    constructor() {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.app = new pc.Application(canvas);
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
        window.onresize = () => this.app.resizeCanvas();
        this.app.start();
        const ground = new pc.Entity('Ground');
        this.app.root.addChild(ground);
        ground.addComponent('model', {
            type: 'box',
        });
        ground.setLocalScale(150, 1, 150);

        // Tạo thành phần Collision và RigidBody cho mặt đất
        ground.addComponent('rigidbody', {
            type: 'static',
        });
        ground.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(0, 0.5, 0),
        });
        const light = new pc.Entity('Directional Light');
        light.addComponent('light', {
            type: 'directional',
            color: new pc.Color(1, 1, 1),
            intensity: 1,
        });
        light.setLocalEulerAngles(45, 30, 0);
        this.app.root.addChild(light);
    }

    public getApp(): pc.Application {
        return this.app;
    }
}
