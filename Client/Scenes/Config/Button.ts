import * as pc from 'playcanvas';

export default class Button extends pc.Entity {
    constructor(data: { width: number; height: number }) {
        super();
        this.init(data);
        this.addComponent('button');
    }

    protected init(data: { width: number; height: number }) {
        this.addComponent('element', {
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            type: pc.ELEMENTTYPE_IMAGE,
            useInput: true,
            color: new pc.Color(1, 1, 1),
        });
    }
}
