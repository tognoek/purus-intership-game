import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import Text from '../../Config/Text';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';

export default class LobbyUI implements UI {
    private screen: pc.Entity;
    private textShow: Text;
    private textIdRoom: Text;
    private textShowSize: Text;
    private textSize: Text;
    private lable: Text;
    private background: BackGround;
    private background_two: BackGround;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.textShow = new Text({ width: 240, height: 80 }, 'center', true);
        this.textIdRoom = new Text({ width: 240, height: 80 }, 'center', true);
        this.textShowSize = new Text({ width: 240, height: 80 }, 'center', true);
        this.textSize = new Text({ width: 240, height: 80 }, 'center', true);
        this.lable = new Text({ width: 300, height: 80 });
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });

        this.background_two = new BackGround(
            {
                width: 500,
                height: 550,
            },
            LoadData.gI().assets.background_brow
        );
        this.background_two.setLocalPosition(0, 40, 0);
        this.init();
    }

    private init() {
        this.textShow.setLocalPosition(-40, 200, 0);
        this.textIdRoom.setLocalPosition(20, 100, 0);
        this.textShowSize.setLocalPosition(-40, 0, 0);
        this.textShowSize.setText(`Player`);
        this.textSize.setLocalPosition(20, -100, 0);
        this.lable.setText('Lobby');
        this.lable.setColor(1, 1, 1);
        this.lable.setLocalPosition(0, 300, 0);
        this.screen.addChild(this.background);
        this.screen.addChild(this.background_two);
        this.screen.addChild(this.textShow);
        this.screen.addChild(this.textIdRoom);
        this.screen.addChild(this.textShowSize);
        this.screen.addChild(this.textSize);
        this.screen.addChild(this.lable);
    }

    public setText(idRoom: string, size: number, max: number) {
        this.textShow.setText(`ID ROOM`);
        this.textIdRoom.setText(idRoom);
        this.textSize.setText(`${size}|${max}`);
    }

    close(): void {
        this.background.enabled = false;
        this.background_two.enabled = false;
        this.lable.enabled = false;
        this.textShow.enabled = false;
        this.textIdRoom.enabled = false;
        this.textShowSize.enabled = false;
        this.textSize.enabled = false;
    }
    open(): void {
        this.background.enabled = true;
        this.background_two.enabled = true;
        this.lable.enabled = true;
        this.textShow.enabled = true;
        this.textIdRoom.enabled = true;
        this.textShowSize.enabled = true;
        this.textSize.enabled = true;
    }
}
