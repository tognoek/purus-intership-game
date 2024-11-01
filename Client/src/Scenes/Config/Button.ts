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
        });
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

    public mouseDown(callBack: Function){
        this.button?.on('mousedown', () => {
            callBack();
        })
    }

    public mouseUp(callBack: Function){
        this.button?.on('mouseup', () => {
            callBack();
        })
    }
}
