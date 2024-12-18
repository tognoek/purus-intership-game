import * as pc from 'playcanvas';
import LoadData from '../../../Script/LoadData';
import ImageText from '../../Config/ImageText';

export default class HealthBar extends pc.Entity {
    private hpBar: pc.Entity;         
    private hpText: pc.Entity;         
    private currentHp: number;
    private maxHp: number;
    private public: ImageText;
    private private: ImageText;
    private idRoom: pc.Entity;
    private data: {width: number, height: number}

    constructor(hp: number, hpMax: number, data: { width: number; height: number }) {
        super();
        this.currentHp = hp;
        this.maxHp = hpMax;
        this.hpBar = new pc.Entity();
        this.public = new ImageText({width: 200, height: 80});
        this.private = new ImageText({width: 200, height: 80});
        this.idRoom = new pc.Entity();
        this.hpText = new pc.Entity();
        this.data = data;
        this.int();
    }

    private int(){
        this.hp();
        this.score();
        // this.room();
    }

    private room(){
        this.idRoom.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0, 1, 0, 1],
            pivot: [0, 0.5],
            fontSize: 38,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            color: new pc.Color(0, 0, 0),
            text: `ID: `,
        });
        this.idRoom.setLocalPosition(-80, -140, 0);
        this.addChild(this.idRoom);
    }

    private score(){
        this.public.setImage(LoadData.gI().assets.public)
        this.public.setLocalPosition(-200, -100, 0);
        this.addChild(this.public);
        this.private.setImage(LoadData.gI().assets.private)
        this.private.setLocalPosition(-200, -200, 0);
        this.addChild(this.private);
    }

    private hp(){
        this.hpBar.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0, 0.5, 0, 0.5],
            pivot: [0, 0.5],
            width: this.data.width * (this.currentHp / this.maxHp),  
            height: this.data.height - 34,
            color: new pc.Color(1, 0.4, 0.7), 
        });
        this.hpBar.setLocalPosition(0, 0, 0);
        this.addChild(this.hpBar);

        this.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.data.width,
            height: this.data.height - 34,
        });
        const background = new pc.Entity();
        background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: this.data.width + 6,
            height: this.data.height,
            textureAsset: LoadData.gI().assets.load_bar,
        });
        background.setLocalPosition(0, -4, 0);
        this.addChild(background);
        const icon = new pc.Entity();
        icon.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 80,
            height: 80,
            textureAsset: LoadData.gI().assets.hp,
        });
        icon.setLocalPosition(-260, 0, 0);
        this.addChild(icon);
        this.hpText.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            fontSize: 28,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            color: new pc.Color(0, 0, 0),
            text: `${this.currentHp}/${this.maxHp}`,
        });
        this.hpText.setLocalPosition(-3, 0, 0);
        this.addChild(this.hpText);
    }

    public setTextScore(score: number, point: number){
        this.public.setText(point.toString());
        this.private.setText(score.toString());
    }

    public setTextRoom(id: string){
        // this.idRoom.element!.text = `ID: ${id}`;
    }

    public setHp(newHp: number, maxHp: number) {
        this.maxHp = maxHp;
        this.currentHp = Math.max(0, Math.min(newHp, this.maxHp));  
        const hpPercent = this.currentHp / this.maxHp;
        this.hpBar.element!.width = this.element!.width * hpPercent;
        this.hpText.element!.text = `${this.currentHp}/${this.maxHp}`;
    }
}
