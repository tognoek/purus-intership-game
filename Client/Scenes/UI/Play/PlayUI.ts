import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import TextBasic from '../../Config/TextBasic';

export default class PlayUI implements UI {
    private screen: pc.Entity;
    private is: boolean;
    private textShow: TextBasic | null;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.is = false;
        this.textShow = null;
    }

    private init() {
        this.textShow = new TextBasic({ width: 240, height: 80 }, 'Welcome Tognoek');
        this.textShow.setSize(70);
        this.textShow.setLocalPosition(0, 160, 0);
        this.screen.addChild(this.textShow);
    }

    close(): void {
        if (!this.is) {
            return;
        }
        this.is = false;
        this.textShow!.enabled = false;
    }
    open(): void {
        if (this.is) {
            return;
        }
        this.is = true;
        this.init();
        this.textShow!.enabled = true;
    }
}
