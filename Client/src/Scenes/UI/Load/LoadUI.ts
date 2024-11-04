import LoadData from '../../../Script/LoadData';
import BackGround from '../../Config/Background';
import Image from '../../Config/Image';
import UI from '../InterfaceUI';
import ProgressBar from './ProgressBar';

export default class LoadUI implements UI {
    private background: BackGround;
    private progressBar: ProgressBar;
    private screen: pc.Entity;
    private control: Image;
    private bassic: Image;
    private point: Image;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });
        this.control = new Image({ width: 500, height: 600 });
        this.control.setImage(LoadData.gI().assets.control);
        this.control.setLocalPosition(-550, 50, 0);
        this.bassic = new Image({ width: 500, height: 600 });
        this.bassic.setImage(LoadData.gI().assets.bassic);
        this.bassic.setLocalPosition(0, 50, 0);
        this.point = new Image({ width: 500, height: 600 });
        this.point.setImage(LoadData.gI().assets.point);
        this.point.setLocalPosition(550, 50, 0);
        this.progressBar = new ProgressBar({ width: 900, height: 80 });
        this.progressBar.setLocal(0, -340, 0);
        this.init();
    }

    private init() {
        this.screen.addChild(this.background);
        this.screen.addChild(this.progressBar);
        this.screen.addChild(this.control);
        this.screen.addChild(this.bassic);
        this.screen.addChild(this.point);
    }

    public setTime(time: number) {
        this.progressBar.setTime(time);
    }

    close(): void {
        this.background.enabled = false;
        this.control.enabled = false;
        this.bassic.enabled = false;
        this.point.enabled = false;
        this.progressBar.enabled = false;
    }
    open(): void {
        this.background.enabled = true;
        this.control.enabled = true;
        this.bassic.enabled = true;
        this.point.enabled = true;
        this.progressBar.enabled = true;
    }
}
