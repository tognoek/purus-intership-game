import * as pc from 'playcanvas';

import LoadData from '../../Script/LoadData';
import Manager from '../../Core/Manager';

export default class PlayUI {
    private screen: pc.Entity;
    private margin: number[];
    private hp: pc.Entity;
    private point: pc.Entity;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.margin = [10, -10];
        this.hp = new pc.Entity();
        this.point = new pc.Entity();
        this.init();
    }

    private init() {
        this.hp.setLocalPosition(this.margin[0], this.margin[1], 0);
        this.hp.addComponent('element', {
            pivot: new pc.Vec2(0, 1),
            anchor: new pc.Vec4(0, 1, 0, 1),
            fontAsset: LoadData.gI().assets.FontGamja.id,
            fontSize: 42,
            text: 'Hp: 0',
            type: pc.ELEMENTTYPE_TEXT,
            width: 200,
            height: 50,
        });
        this.screen.addChild(this.hp);

        this.point.setLocalPosition(this.margin[0], this.margin[1] - 42, 0);
        this.point.addComponent('element', {
            pivot: new pc.Vec2(0, 1),
            anchor: new pc.Vec4(0, 1, 0, 1),
            fontAsset: LoadData.gI().assets.FontGamja.id,
            fontSize: 42,
            text: 'Point: 0',
            type: pc.ELEMENTTYPE_TEXT,
            width: 200,
            height: 50,  
        });
        this.screen.addChild(this.point);

        const button = new pc.Entity();
        button.addComponent('button');
        button.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            height: 40,
            pivot: [0.5, 0.5],
            type: pc.ELEMENTTYPE_IMAGE,
            width: 175,
            useInput: true,
        });
        this.screen.addChild(button);

        const label = new pc.Entity();
        label.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            color: new pc.Color(0, 0, 0),
            fontAsset: LoadData.gI().assets.FontGamja.id,
            fontSize: 32,
            height: 64,
            pivot: [0.5, 0.5],
            text: 'CLICK ME',
            type: pc.ELEMENTTYPE_TEXT,
            width: 128,
            wrapLines: true,
        });
        button.addChild(label);
        if (button.button){
            button.button.on('click', function (event: pc.ElementInputEvent) {
                console.log(123)
            });
        }
    }

    public updateHp(hp: number) {
        this.hp.element!.text = `Hp: ${hp}`;
    }

    public updatePoint(point: number) {
        this.point.element!.text = `Point: ${point}`;
    }
}
