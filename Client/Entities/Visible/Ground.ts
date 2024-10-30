import * as pc from "playcanvas";
import LoadData from "../../Script/LoadData";
import Manager from "../../Core/Manager";

export default class Ground {
    private ground: pc.Entity;

    constructor() {
        this.ground = new pc.Entity();
        this.ground.addComponent('model', {
            type: 'box',
        });
        this.ground.setLocalScale(150, 1, 150);
        this.ground.setLocalPosition(0, 1, 0);
        this.applyTexture();
        this.init();
    }

    private applyTexture() {
        const material = new pc.StandardMaterial();
        material.diffuseMap = LoadData.gI().assets.ground.resource;
        material.update();
        this.ground.model!.model.meshInstances[0].material = material;
    }

    public init() {
        Manager.gI().canvas.addChild(this.ground);
    }

    public close() {
        this.ground.enabled = false;
    }

    public open() {
        this.ground.enabled = true;
    }
}
