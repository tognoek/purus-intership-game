import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import TextBasic from '../../Config/TextBasic';
import ButtonText from '../../Config/ButtonText';
import Manager from '../../../Core/Manager';
import CreateMessege from '../../../Script/CreateMessenge';
import Session from '../../../Core/Session';

export default class HomeUI implements UI {
    private screen: pc.Entity;
    private textShow: TextBasic | null;
    private background: BackGround | null;
    private newRoom: ButtonText | null;
    private joinRoom: ButtonText | null;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.textShow = null;
        this.background = null;
        this.newRoom = null;
        this.joinRoom = null;
        this.init();
    }

    private init() {
        this.textShow = new TextBasic({ width: 240, height: 80 }, 'Welcome Tognoek');
        this.background = new BackGround(
            {
                width: this.screen.screen!.referenceResolution.x,
                height: this.screen.screen!.referenceResolution.y,
            },
            LoadData.gI().assets.background_cute
        );
        this.newRoom = new ButtonText('New Room');
        this.joinRoom = new ButtonText('Join Room');
        this.textShow.setSize(70);
        this.textShow.setLocalPosition(0, 160, 0);
        this.newRoom.button.setLocal(-180, 0, 0);
        this.joinRoom.button.setLocal(180, 0, 0);
        this.joinRoom.mouseDown(() => {
            Manager.gI().screen?.updateStatus('room');
        });
        this.newRoom.mouseDown(() => {
            let message = CreateMessege.getInstance().newRoom('Tớ tạo Room mới!');
            Session.gI().send(message);
        });
        this.screen.addChild(this.background);
        this.screen.addChild(this.textShow);
        this.screen.addChild(this.newRoom.button);
        this.screen.addChild(this.joinRoom.button);
    }

    close(): void {
        this.background!.enabled = false;
        this.textShow!.enabled = false;
        this.joinRoom!.button!.enabled = false;
        this.newRoom!.button!.enabled = false;
    }
    open(): void {
        this.background!.enabled = true;
        this.textShow!.enabled = true;
        this.joinRoom!.button!.enabled = true;
        this.newRoom!.button!.enabled = true;
    }
}
