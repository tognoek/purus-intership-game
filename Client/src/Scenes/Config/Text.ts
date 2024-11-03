import * as pc from 'playcanvas';
import LoadData from '../../Script/LoadData';

export default class Text extends pc.Entity {
    private textElement: pc.Entity;
    private alignment: 'left' | 'center' | 'right';
    private is: boolean;

    constructor(data: { width: number; height: number }, alignment: 'left' | 'center' | 'right' = 'center', is: boolean = false) {
        super();
        this.textElement = new pc.Entity();
        this.alignment = alignment;
        this.is = is;
        this.init(data);
    }

    protected init(data: { width: number; height: number }) {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            textureAsset: this.is ? LoadData.gI().assets.gray_background_box : LoadData.gI().assets.background_text,
        });

        this.textElement.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(1, 1, 1),
            fontSize: 42,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: '',
        });
        this.addChild(this.textElement);
        this.setLocalPosition(0, 0, 0);
        this.textElement.setLocalPosition(0, 0, 1);
    }

    public setImage(image: pc.Asset){
        this.element!.textureAsset = image.id;
    }

    public setText(text: string) {
        if (this.textElement.element) {
            this.textElement.element.text = text;
        }
    }

    public setFont(font: number) {
        if (this.textElement.element) {
            this.textElement.element.fontSize = font;
        }
    }

    public setColor(x: number, y: number, z: number){
        if (this.textElement.element) {
            this.textElement.element.color = new pc.Color(x, y, z);
        }
    }
    public setAlignment(alignment: 'left' | 'center' | 'right') {
        this.alignment = alignment;
        if (!this.textElement.element){
            return;
        }
        switch (alignment) {
            case 'left':
                this.textElement.element.anchor = [0, 0.5, 0, 0.5]; 
                break;
            case 'center':
                this.textElement.element.anchor = [0.5, 0.5, 0.5, 0.5]; 
                break;
            case 'right':
                this.textElement.element.anchor = [1, 0.5, 1, 0.5]; 
                break;
        }
        this.textElement.setLocalPosition(0, 0, 1);
    }
}
