import * as pc from "playcanvas";
import LoadData from "../../../Script/LoadData";

export default class ProgressBar extends pc.Entity{

    private background: pc.Entity;
    private progress: pc.Entity;

    constructor(data: { width: number; height: number }){
        super();
        this.background = new pc.Entity();
        this.progress = new pc.Entity();
        this.addComponent('element',{
            anchor: [0, 0, 1, 1],
            pivot: [0.5, 0.5],
        });
        this.init(data);
    }

    private init(data: { width: number; height: number }){
        this.background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            textureAsset: LoadData.gI().assets.load,
        })
        this.progress.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width - 20,
            height: data.height - 20,
            color: new pc.Color(0.0, 0, 0.5)
        })
        this.addChild(this.progress);
        this.addChild(this.background);
    }
}