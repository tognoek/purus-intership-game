import * as pc from 'playcanvas';
import LoadData from '../../Script/LoadData';

export default class ImageText extends pc.Entity {
    private text: pc.Entity;
    private data: any;
    constructor(data: { width: number; height: number }) {
        super();
        this.data = data;
        this.text = new pc.Entity();
        this.init();
    }

    protected init() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.data.width,
            height: this.data.height,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
        });
        this.text.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.data.width,
            height: this.data.height,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(255 / 255, 1 / 255, 115 / 255),
            fontSize: 80,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: '',
        })
        this.addChild(this.text);
    }

    public setText(text: string){
        this.text.element!.text = text;
        this.text.setLocalPosition(this.data.width - (4 - text.length) * 20, -10, 0)
    }

    public setAnchorPivot(data: {anchor: number[], pivot: number[]}){
        this.element!.anchor = data.anchor;
        this.element!.pivot = data.pivot;
    }

    public setLocal(x: number, y: number, z: number): void {
        this.setLocalPosition(x, y, z);
    }

    public setImage(image: pc.Asset){
        this.element!.textureAsset = image.id;
    }
}
