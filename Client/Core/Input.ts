import * as pc from 'playcanvas';
import CreateMessege from '../Script/CreateMessenge';
import Messange from '../Services/Messange';
import Session from '../Services/Session';

export default class Input {
    constructor() {}

    public addListener() {
        const app = Session.getInstance().gameCanvas?.getApp();
        if (app && app.keyboard) {
            app.keyboard.on(pc.EVENT_KEYDOWN, this.down);
            app.keyboard.on(pc.EVENT_KEYUP, this.up);
        }
        if (app && app.mouse) {
            app.mouse.on(pc.EVENT_MOUSEDOWN, this.mouseDown);
        }
    }

    mouseDown(event: MouseEvent){
        let message: Messange | null = null;
        switch (event.button) {
            case pc.MOUSEBUTTON_LEFT:
                message = CreateMessege.getInstance().attack();
                break;
        
            default:
                break;
        }
        if (message) {
            Session.getInstance().send(message);
        }
    }

    up(event: pc.KeyboardEvent) {
        let message: Messange | null = null;
        switch (event.key) {
            case pc.KEY_W:
            case pc.KEY_A:
            case pc.KEY_S:
            case pc.KEY_D:
                message = CreateMessege.getInstance().movent(0, 0, 0);
                break;
            default:
                // message = new Messange(3105, { tognoek: '3105' });
                break;
        }
        if (message) {
            Session.getInstance().send(message);
        }
    }

    down(event: pc.KeyboardEvent) {
        document.body.addEventListener('click', function () {
            if (!document.pointerLockElement) {
                document.body.requestPointerLock();
            }
        });
        let app = Session.getInstance().gameCanvas?.getApp();
        if (app && app.mouse) {
            app.mouse.on('mousemove', function (event) {
                const deltaX = event.dx;
                const deltaY = event.dy;
                Session.getInstance().camera?.rotateVectorAroundX(deltaX);
                Session.getInstance().camera?.rotateVectorAroundY(deltaY);
            });
        }
        let message: Messange | null = null;
        const velocity = 8;
        switch (event.key) {
            case pc.KEY_Y:
                message = CreateMessege.getInstance().joinRoom('1403');
                break;
            case pc.KEY_W:
                message = CreateMessege.getInstance().movent(0, 0, -velocity);
                break;
            case pc.KEY_S:
                message = CreateMessege.getInstance().movent(0, 0, velocity);
                break;
            case pc.KEY_A:
                message = CreateMessege.getInstance().movent(-velocity, 0, 0);
                break;
            case pc.KEY_D:
                message = CreateMessege.getInstance().movent(velocity, 0, 0);
                break;
            case pc.KEY_SPACE:
                message = CreateMessege.getInstance().jump(0, 300, 0);
                break;
            default:
                // message = new Messange(3105, { tognoek: '3105' });
                break;
        }
        if (message) {
            Session.getInstance().send(message);
        }
    }
}
