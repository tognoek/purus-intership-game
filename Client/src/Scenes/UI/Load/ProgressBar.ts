import * as pc from "playcanvas";
import LoadData from "../../../Script/LoadData";

export default class ProgressBar extends pc.Entity{

    private background: pc.Entity;
    private white: pc.Entity;
    private text: pc.Entity;
    private progress: pc.Entity;
    private load: pc.Entity;
    private maxWidth: number;

    constructor(data: { width: number; height: number }){
        super();
        this.background = new pc.Entity();
        this.white = new pc.Entity();
        this.text = new pc.Entity();
        this.progress = new pc.Entity();
        this.load = new pc.Entity();
        this.maxWidth = data.width - 30;
        this.addComponent('element',{
            anchor: [0.5, 0.5, 0.5, 0.5],
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
            textureAsset: LoadData.gI().assets.load_bar,
        })
        this.white.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width - 30,
            height: data.height - 34,
            color: new pc.Color(1, 1, 1)
        })
        this.progress.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 0,
            height: data.height - 33,
            color: new pc.Color(192 / 255,255 / 255,130 / 255)
        })
        this.text.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(0, 0, 0),
            fontSize: 42,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: '',
        });
        this.load.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 300,
            height: data.height,
            textureAsset: LoadData.gI().assets.load_text,
        })
        this.load.setLocalPosition(0, -80, 0);
        this.addChild(this.white);
        this.addChild(this.load);
        this.addChild(this.progress);
        this.addChild(this.background);
        this.addChild(this.text);
    }
    public setLocal(x: number, y: number, z: number): void {
        this.setLocalPosition(x, y, z);
    }

    public setTime(time: number){
        console.log(Math.floor((5000 - time) / 5000 * 100))
        this.text.element!.text = `${Math.floor((5000 - time) / 5000 * 100)}%`;
        this.progress.element!.width = this.maxWidth * ((5000 - time) / 5000); 
    }
}