import * as pc from 'playcanvas';

import UI from '../InterfaceUI';
import ButtonNumber from '../../Config/ButtonNumber';
import ButtonEnter from '../../Config/ButtonEnter';
import ButtonBackSpace from '../../Config/ButtonBackSpace';
import Text from '../../Config/Text';
import BackGround from '../../Config/Background';
import LoadData from '../../../Script/LoadData';
import CreateMessege from '../../../Script/CreateMessenge';
import Session from '../../../Core/Session';
import ButtonBack from '../../Config/ButtonBack';
import Manager from '../../../Core/Manager';

export default class RoomUI implements UI {
    private numberButtons: ButtonNumber[];
    private screen: pc.Entity;
    private idRoom: string;
    private enter: ButtonEnter;
    private backSpace: ButtonBackSpace;
    private textShow: Text;
    private background: BackGround;
    private background_two: BackGround;
    private back: ButtonBack;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.numberButtons = [];
        this.idRoom = '';
        this.enter = new ButtonEnter();
        this.backSpace = new ButtonBackSpace();
        this.textShow = new Text({ width: 500, height: 180 }, 'center', true);
        this.textShow.setImage(LoadData.gI().assets.input);
        this.textShow.setColor(0, 0, 0);
        this.textShow.setFont(60);
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });
        this.back = new ButtonBack();
        this.background_two = new BackGround(
            {
                width: 500,
                height: 580,
            },
            LoadData.gI().assets.bg_box
        );
        this.background_two.setLocalPosition(0, -40, 0);
        this.init();
    }

    private init() {
        for (let i = 1; i <= 10; i++) { 
            const button = new ButtonNumber(i);
            let row, col, x, y;
        
            row = Math.floor((i - 1) / 3);
            col = (i - 1) % 3;
        
            x = (col - 1) * 110; 
            y = (1 - row) * 110; 
            if (i == 10){
                x = 0;
                y = -220;
            }
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
            Session.gI().send(message);
        });
        this.backSpace.mouseUp(() => {});
        this.back.mouseDown(() => {
            Manager.gI().screen?.updateStatus('home');
        });
        this.enter.mouseUp(() => {});
        this.backSpace.button.setLocal(110, -220, 0);
        this.back.button.setLocal(-600, 340, 0);
        this.enter.button.setLocal(-110, -220, 0);
        this.textShow.setLocalPosition(0, 360, 0);
        this.screen.addChild(this.background);
        this.screen.addChild(this.background_two);
        this.numberButtons.forEach((button) => {
            this.screen.addChild(button.button);
        });
        this.screen.addChild(this.backSpace.button);
        this.screen.addChild(this.back.button);
        this.screen.addChild(this.enter.button);
        this.screen.addChild(this.textShow);
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
        this.textShow.enabled = false;
        this.enter.button.enabled = false;
        this.backSpace.button.enabled = false;
        this.back.button.enabled = false;
    }
    open(): void {
        this.idRoom = '';
        this.textShow.setText(this.idRoom);
        this.numberButtons.forEach((button) => {
            button.button.enabled = true;
        });
        this.background.enabled = true;
        this.background_two.enabled = true;
        this.textShow.enabled = true;
        this.enter.button.enabled = true;
        this.backSpace.button.enabled = true;
        this.back.button.enabled = true;
    }
}
