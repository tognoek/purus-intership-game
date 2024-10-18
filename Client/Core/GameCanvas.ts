import * as pc from 'playcanvas';
import CreateModel from '../Script/CreateModle';
import Session from '../Services/Session';

export default class GameCanvas {
    private app: pc.Application;
    private dot: pc.Entity;

    constructor() {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: new pc.TouchDevice(canvas),
            keyboard: new pc.Keyboard(window),
        });
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
            castShadowns: false,
            intensity: 1,
        });
        light.setLocalEulerAngles(45, 30, 0);
        this.app.root.addChild(light);
        this.dot = new pc.Entity('dot');

        this.dot.addComponent('model', {
            type: 'sphere',
        });

        this.dot.setLocalScale(0.1, 0.1, 0.1);
        const redMaterial = new pc.StandardMaterial();
        redMaterial.emissive = new pc.Color(1, 0, 0); 
        redMaterial.useLighting = false;
        redMaterial.update();
        if (this.dot.model?.meshInstances?.[0]) {
            this.dot.model.meshInstances[0].material = redMaterial;
        }
        this.dot.setPosition(new pc.Vec3());

        this.app.root.addChild(this.dot);
    }

    public setPositionDot(position: pc.Vec3){
        this.dot.setPosition(position);
    }

    public getApp(): pc.Application {
        // console.log(this.app.stats.frame.fps)
        return this.app;
    }
}
