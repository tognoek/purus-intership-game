import * as pc from 'playcanvas';
import LoadData from '../../Script/LoadData';

export default class BackGround extends pc.Entity {
    constructor(
        data: { width: number; height: number },
        background: any | null = LoadData.gI().assets.background_cute
    ) {
        super();
        this.init(data, background);
    }

    protected init(data: { width: number; height: number }, background: any) {
        this.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            width: data.width,
            height: data.height,
            textureAsset: background,
        });

        this.setLocalPosition(0, 0, 0);
    }
}
