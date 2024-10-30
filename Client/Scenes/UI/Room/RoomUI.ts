import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import ButtonNumber from '../../Config/ButtonNumber';
import ButtonEnter from './ButtonEnter';
import ButtonBackSpace from './ButtonBackSpace';
import Text from '../../Config/Text';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import CreateMessege from '../../../Script/CreateMessenge';
import Session from '../../../Core/Session';

export default class RoomUI implements UI {
    private numberButtons: ButtonNumber[];
    private screen: pc.Entity;
    private idRoom: string;
    private enter: ButtonEnter;
    private backSpace: ButtonBackSpace;
    private textShow: Text;
    private lable: Text;
    private background: BackGround;
    private background_two: BackGround;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.numberButtons = [];
        this.idRoom = '';
        this.enter = new ButtonEnter();
        this.backSpace = new ButtonBackSpace();
        this.textShow = new Text({ width: 240, height: 80 }, 'center', true);
        this.lable = new Text({ width: 300, height: 80 });
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });

        this.background_two = new BackGround(
            {
                width: 500,
                height: 450,
            },
            LoadData.gI().assets.background_brow
        );
        this.background_two.setLocalPosition(0, 40, 0);
        this.init();
    }

    private init() {
        for (let i = 1; i <= 10; i++) {
            const button = new ButtonNumber(i);
            let row, col, x, y;
            if (i <= 4) {
                row = 0;
                col = i - 1;
            } else if (i <= 8) {
                row = 1;
                col = i - 5;
            } else {
                row = 2;
                col = i - 9;
            }
            x = (col - 1.5) * 80;
            y = (1 - row) * 80;
            button.button.setLocal(x, y, 0);
            button.mouseDown((index: string) => {
                this.keyDownNumber(index);
            });

            button.mouseUp((index: string) => {});
            this.numberButtons.push(button);
        }
        this.backSpace.mouseDown(() => {
            this.idRoom = this.idRoom.slice(0, this.idRoom.length - 1);
            this.textShow.setText(this.idRoom);
        });
        this.backSpace.mouseUp(() => {});
        this.enter.mouseDown(() => {
            let message = CreateMessege.getInstance().joinRoom(this.idRoom);
            Session.getInstance().send(message);
        });
        this.enter.mouseUp(() => {});
        this.backSpace.button.setLocal(80, -80, 0);
        this.enter.button.setLocal(120, 160, 0);
        this.textShow.setLocalPosition(-40, 160, 0);
        this.lable.setText('Join Room');
        this.lable.setColor(1, 1, 1);
        this.lable.setLocalPosition(0, 260, 0);
        this.screen.addChild(this.background);
        this.screen.addChild(this.background_two);
        this.numberButtons.forEach((button) => {
            this.screen.addChild(button.button);
        });
        this.screen.addChild(this.backSpace.button);
        this.screen.addChild(this.enter.button);
        this.screen.addChild(this.textShow);
        this.screen.addChild(this.lable);
    }

    public keyDownNumber(index: string) {
        if (this.idRoom.length < 7) {
            this.idRoom += index;
            this.idRoom = this.idRoom.replace(/^0+/, '');
        }
        this.textShow.setText(this.idRoom);
    }

    close(): void {
        this.numberButtons.forEach((button) => {
            button.button.enabled = false;
        });
        this.background.enabled = false;
        this.background_two.enabled = false;
        this.lable.enabled = false;
        this.textShow.enabled = false;
        this.enter.button.enabled = false;
        this.backSpace.button.enabled = false;
    }
    open(): void {
        this.idRoom = '';
        this.textShow.setText(this.idRoom);
        this.numberButtons.forEach((button) => {
            button.button.enabled = true;
        });
        this.background.enabled = true;
        this.background_two.enabled = true;
        this.lable.enabled = true;
        this.textShow.enabled = true;
        this.enter.button.enabled = true;
        this.backSpace.button.enabled = true;
    }
}
