import * as pc from 'playcanvas';

import Entity from './Enity';

export default class Camera extends Entity {
    private target: string;
    private distance: number;
    private camera: pc.Entity;

    constructor(id: string, position: pc.Vec3, target: string) {
        super(id, position);
        this.target = target;
        this.distance = 1;
        this.camera = new pc.Entity('camera');
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(0.5, 0.5, 0.5), // Màu nền của camera
        });
    }

    public getTarget(): string {
        return this.target;
    }

    public setTarget(id: string){
        this.target = id;
    }

    public getCamera(){
        return this.camera;
    }

    public update(targetPosition: pc.Vec3) {
        const distanceBehind = 14; 
        const distanceAbove = 8; 
        const lerpFactor = 0.1; 
    
        const targetCameraPosition = targetPosition.clone();
        targetCameraPosition.z += distanceBehind;
        targetCameraPosition.y += distanceAbove; 
        const currentPosition = this.camera.getPosition();
        if (currentPosition.z < targetCameraPosition.z){
            currentPosition.z += 0.1;
        }else{
            currentPosition.z -= 0.1;
        }
        if (currentPosition.y < targetCameraPosition.y){
            currentPosition.y += 0.1;
        }else{
            currentPosition.y -= 0.1;
        }
        // const newPosition = new pc.Vec3().lerp(currentPosition, targetCameraPosition, 1/60);
    
        this.camera.setPosition(targetCameraPosition);
        let lockAt = targetPosition.clone();
        lockAt.z -= 2;
        this.camera.lookAt(targetPosition);
    }
    

    public addForApp(app: pc.Application) {
        app.root.addChild(this.camera);
    }
}
