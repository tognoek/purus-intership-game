import * as pc from 'playcanvas';
import LoadData from '../../Script/LoadData';

export default class TextBasic extends pc.Entity {
    constructor(data: { width: number; height: number }, text: string) {
        super();
        this.init(data, text);
    }

    protected init(data: { width: number; height: number }, text: string) {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(1, 1, 1),
            fontSize: 42,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: text,
        });
    }

    public setText(text: string) {
        if (this.element) {
            this.element.text = text;
        }
    }

    public setSize(size: number){
        if (this.element) {
            this.element.fontSize = size;
        }
    }

    public setColor(x: number, y: number, z: number) {
        if (this.element) {
            this.element.color = new pc.Color(x, y, z);
        }
    }
}
