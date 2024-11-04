import * as pc from 'playcanvas';
import LoadData from '../../../Script/LoadData';
import Image from '../../Config/Image';

export default class Top extends pc.Entity{
    private text: Image;
    private start: Image[];
    constructor(top: number) {
        super();
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 500,
            height: 240,
            textureAsset: LoadData.gI().assets.bg_box,
        });
        this.text = new Image({ width: 200, height: 100 });
        this.text.setImage(LoadData.gI().assets.top);
        this.start = [];
        for (let index = 0; index < top; index++) {
            const start_child = new Image({ width: 80, height: 80 });
            start_child.setImage(LoadData.gI().assets.start);
            this.start.push(start_child);
        }
        switch (top) {
            case 1:
                this.start[0].setLocal(0, -40, 0);
                break;
            case 2:
                this.start[0].setLocal(-50, -40, 0);
                this.start[1].setLocal(50, -40, 0);
                break;
            case 3:
                this.start[0].setLocal(0, -40, 0);
                this.start[1].setLocal(-90, -40, 0);
                this.start[2].setLocal(90, -40, 0);
                break;
            case 4:
                this.start[0].setLocal(-50, -40, 0);
                this.start[1].setLocal(50, -40, 0);
                this.start[2].setLocal(-140, -40, 0);
                this.start[3].setLocal(140, -40, 0);
                break;

            default:
                break;
        }
        this.text.setLocal(0, 40, 0);
        this.addChild(this.text);
        for (const start of this.start){
            this.addChild(start);
        }
    }
}
