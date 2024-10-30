import * as pc from "playcanvas";
import Manager from "../../Core/Manager";

export default class Light{
    private light: pc.Entity;
    constructor(){
        this.light = new pc.Entity('Directional Light');
        this.light.addComponent('light', {
            type: 'directional',
            color: new pc.Color(1, 1, 1),
            castShadowns: false,
            intensity: 1,
        });
        this.init();
    }  
    public setLockAt(position: pc.Vec3){
        this.light.lookAt(position);
    }

    private init(){
        Manager.gI().canvas.addChild(this.light);
    }

    public close(){
        this.light.enabled = false;
    }
    public open(){
        this.light.enabled = true;
    }
}