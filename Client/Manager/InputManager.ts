import * as pc from 'playcanvas';
import CreateMessege from '../Script/CreateMessenge';
import Messange from '../Services/Messange';
import Session from '../Core/Session';
import Manager from '../Core/Manager';

export default class InputManager {
    private app: pc.Application;
    constructor(app: pc.Application) {
        this.app = app;
    }

    public addListener() {
        if (this.app && this.app.keyboard) {
            this.app.keyboard.on(pc.EVENT_KEYDOWN, this.down);
            this.app.keyboard.on(pc.EVENT_KEYUP, this.up);
        }
        if (this.app && this.app.mouse) {
            // this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.mouseDown);
            // this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.mouseMove);
        }
    }

    mouseMove(event: pc.MouseEvent) {
        const deltaX = event.dx;
        const deltaY = event.dy;
        Manager.gI().camera?.rotateVectorAroundX(deltaX);
        Manager.gI().camera?.rotateVectorAroundY(deltaY);
    }

    mouseDown(event: MouseEvent) {
        document.body.addEventListener('click', function () {
            if (!document.pointerLockElement) {
                document.body.requestPointerLock();
            }
        });
        let message: Messange | null = null;
        switch (event.button) {
            case pc.MOUSEBUTTON_LEFT:
                message = CreateMessege.getInstance().attack();
                let model = Manager.gI().game.getModel(Session.getInstance().getIdUser() ?? 'a');
                let player = Manager.gI().game.getPlayer(Session.getInstance().getIdUser() ?? 'a');
                if (player?.setStatus('attack')) {
                    model?.updateAnimation();
                }
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
        let message: Messange | null = null;
        const velocity = 8;
        switch (event.key) {
            case pc.KEY_I:
                message = CreateMessege.getInstance().newRoom('1403');
                break;
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
            case pc.KEY_K:
                Manager.gI().canvas.getAllEntities();
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
