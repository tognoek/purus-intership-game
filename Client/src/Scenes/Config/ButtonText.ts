import * as pc from 'playcanvas';

import LoadData from '../../Script/LoadData';
import Button from './Button';

export default class ButtonText {
    public button: Button;
    public textElement: pc.Entity;

    constructor(text: string) {
        this.button = new Button({ width: 320, height: 160 });
        this.button.setImage(LoadData.gI().assets.background_button);
        this.textElement = new pc.Entity();
        this.init(text);
    }

    private init(text: string) {
        this.textElement.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 140,
            height: 70,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(0, 0, 0),
            fontSize: 42,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: text,
        });
        this.button.addChild(this.textElement);
    }

    public setImage(image: pc.Asset){
        this.button.setImage(image);
    }

    public mouseDown(callBack: Function) {
        this.button.mouseDown(() => {
            callBack();
        });
    }

    public mouseUp(callBack: Function) {
        this.button.mouseUp(() => {
            callBack();
        });
    }
}
