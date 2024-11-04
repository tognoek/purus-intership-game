import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import Text from '../../Config/Text';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import ButtonBack from '../../Config/ButtonBack';
import Manager from '../../../Core/Manager';
import CreateMessege from '../../../Script/CreateMessenge';
import Session from '../../../Core/Session';
import TextBasic from '../../Config/TextBasic';

export default class LobbyUI implements UI {
    private screen: pc.Entity;
    private textIdRoom: TextBasic;
    private textSize: TextBasic;
    private background: BackGround;
    private background_two: BackGround;
    private back: ButtonBack;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.textIdRoom = new TextBasic({width: 200, height: 80}, '');
        this.textIdRoom.setSize(70);
        this.textIdRoom.setColor(0, 0, 0);
        this.textSize = new TextBasic({width: 200, height: 80}, '');
        this.textSize.setSize(70);
        this.textSize.setColor(0, 0, 0);
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });
        this.back = new ButtonBack();
        this.background_two = new BackGround(
            {
                width: 800,
                height: 800,
            },
            LoadData.gI().assets.bg_lobby
        );
        this.background_two.setLocalPosition(0, 40, 0);
        this.init();
    }

    private init() {
        this.back.button.setLocal(-600, 340, 0);
        this.textIdRoom.setLocalPosition(20, 110, 0);
        this.textSize.setLocalPosition(20, -200, 0);
        this.screen.addChild(this.background);
        this.screen.addChild(this.background_two);
        this.screen.addChild(this.textIdRoom);
        this.screen.addChild(this.textSize);
        this.screen.addChild(this.back.button);
        this.back.mouseDown(() => {
            let message = CreateMessege.getInstance().leaveRoom('Leave Room!!');
            Session.gI().send(message);
            Manager.gI().screen?.updateStatus('home');
        });
    }

    public setText(idRoom: string, size: number, max: number) {
        this.textIdRoom.setText(idRoom);
        this.textSize.setText(`${size}|${max}`);
    }

    close(): void {
        this.back.button.enabled = false;
        this.background.enabled = false;
        this.background_two.enabled = false;
        this.textIdRoom.enabled = false;
        this.textSize.enabled = false;
    }
    open(): void {
        this.back.button.enabled = true;
        this.background.enabled = true;
        this.background_two.enabled = true;
        this.textIdRoom.enabled = true;
        this.textSize.enabled = true;
    }
}
