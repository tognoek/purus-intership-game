import * as pc from 'playcanvas';

import LoadData from '../../../Script/LoadData';
import { formatTime } from '../../../Utils/Math';

export default class Time extends pc.Entity {
    private count: number;
    constructor() {
        super();
        this.count = 0;
        this.init();
    }

    protected init() {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: 300,
            height: 100,
            type: pc.ELEMENTTYPE_TEXT,
            color: new pc.Color(0, 0, 0),
            fontSize: 60,
            fontAsset: LoadData.gI().assets.FontGamja.id,
            text: '',
        });
    }

    public setTime(time: number) {
        if (time < 30) {
            this.count += 1;
        }
        if (this.element) {
            this.element.fontSize = 60;
            if (this.count > 0) {
                if (this.count % 4 == 0) {
                    this.element.fontSize = 70;
                }
            }
            this.element.text = formatTime(time);
        }
    }

    public setSize(size: number) {
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
