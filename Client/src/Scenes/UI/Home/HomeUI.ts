import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import ButtonText from '../../Config/ButtonText';
import Manager from '../../../Core/Manager';
import CreateMessege from '../../../Script/CreateMessenge';
import Session from '../../../Core/Session';
import Image from '../../Config/Image';

export default class HomeUI implements UI {
    private screen: pc.Entity;
    private background: BackGround | null;
    private newRoom: ButtonText | null;
    private joinRoom: ButtonText | null;
    private logo: Image | null;
    private name_game: Image | null;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.background = null;
        this.newRoom = null;
        this.joinRoom = null;
        this.logo = null;
        this.name_game = null;
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

        this.name_game = new Image({ width: 800, height: 600 });
        this.name_game.setImage(LoadData.gI().assets.name_game);
        this.name_game.setLocalPosition(-400, 200, 0);
        this.newRoom = new ButtonText('');
        this.newRoom.setImage(LoadData.gI().assets.new_room);
        this.joinRoom = new ButtonText('');
        this.joinRoom.setImage(LoadData.gI().assets.join_room);
        this.newRoom.button.setLocal(-320, -270, 0);
        this.joinRoom.button.setLocal(320, -270, 0);
        this.joinRoom.mouseDown(() => {
            Manager.gI().screen?.updateStatus('room');
        });
        this.newRoom.mouseDown(() => {
            let message = CreateMessege.getInstance().newRoom('Tớ tạo Room mới!');
            Session.gI().send(message);
        });
        this.screen.addChild(this.background);
        this.screen.addChild(this.newRoom.button);
        this.screen.addChild(this.joinRoom.button);
        this.screen.addChild(this.logo);
        this.screen.addChild(this.name_game);
    }

    close(): void {
        this.logo!.enabled = false;
        this.name_game!.enabled = false;
        this.background!.enabled = false;
        this.joinRoom!.button!.enabled = false;
        this.newRoom!.button!.enabled = false;
    }
    open(): void {
        this.logo!.enabled = true;
        this.name_game!.enabled = true;
        this.background!.enabled = true;
        this.joinRoom!.button!.enabled = true;
        this.newRoom!.button!.enabled = true;
    }
}
