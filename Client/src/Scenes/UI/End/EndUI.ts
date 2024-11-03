import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import Manager from '../../../Core/Manager';
import Image from '../../Config/Image';
import ButtonHome from '../../Config/ButtonHome';
import ImageText from '../../Config/ImageText';

export default class EndUI implements UI {
    private screen: pc.Entity;
    private background: BackGround | null;
    private home: ButtonHome | null;
    private logo: Image | null;
    private cup: Image | null;
    private score: ImageText | null;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.background = null;
        this.home = null;
        this.logo = null;
        this.cup = null;
        this.score = null;
        this.init();
    }

    private init() {
        this.background = new BackGround(
            {
                width: this.screen.screen!.referenceResolution.x,
                height: this.screen.screen!.referenceResolution.y,
            },
            LoadData.gI().assets.bg_tognoek
        );
        this.logo = new Image({ width: 800, height: 600 });
        this.logo.setImage(LoadData.gI().assets.bg);
        this.logo.setLocalPosition(500, 160, 0);

        this.cup = new Image({ width: 500, height: 500 });
        this.cup.setImage(LoadData.gI().assets.cup);
        this.cup.setLocalPosition(-600, 0, 0);

        this.score = new ImageText({width: 200, height: 80});
        this.score.setLocal(-200, 120, 0);
        this.score.setImage(LoadData.gI().assets.score);
        this.score.setText('222')

        this.home = new ButtonHome();
        this.home.button.setLocal(-60, -160, 0);
        this.home.mouseDown(() => {
            Manager.gI().screen?.updateStatus('home');
        });
        this.screen.addChild(this.background);
        this.screen.addChild(this.score);
        this.screen.addChild(this.logo);
        this.screen.addChild(this.cup);
        this.screen.addChild(this.home.button);
    }

    close(): void {
        this.logo!.enabled = false;
        this.score!.enabled = false;
        this.cup!.enabled = false;
        this.background!.enabled = false;
        this.home!.button.enabled = false;
    }
    open(): void {
        this.score!.enabled = true;
        this.logo!.enabled = true;
        this.cup!.enabled = true;
        this.background!.enabled = true;
        this.home!.button.enabled = true;
    }
}
