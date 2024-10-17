import CreateMessege from '../Script/CreateMessenge';
import CreateModel from '../Script/CreateModle';
import Messange from '../Services/Messange';
import Session from '../Services/Session';

export default class Input {
    constructor() {}

    public addListener() {
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup', this.up);
    }

    up(event: KeyboardEvent) {
        let message: Messange | null = null;
        switch (event.key) {
            case 'w':
            case 's':
            case 'a':
            case 'd':
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

    down(event: KeyboardEvent) {
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
                Session.getInstance().camera?.rotateVectorAroundX(deltaX)
                Session.getInstance().camera?.rotateVectorAroundY(deltaY)
            });
        }
        let message: Messange | null = null;
        const velocity = 10;
        switch (event.key) {
            case 'y':
                message = CreateMessege.getInstance().joinRoom('1403');
                break;
            case 'w':
                message = CreateMessege.getInstance().movent(0, 0, -velocity);
                break;
            case 's':
                message = CreateMessege.getInstance().movent(0, 0, velocity);
                break;
            case 'a':
                message = CreateMessege.getInstance().movent(-velocity, 0, 0);
                break;
            case 'd':
                message = CreateMessege.getInstance().movent(velocity, 0, 0);
                break;
            case ' ':
                message = CreateMessege.getInstance().jump(0, 300, 0);
                break;
            case 'r':
            // console.log(Session.getInstance().game.getCamera().getTarget())
            default:
                // message = new Messange(3105, { tognoek: '3105' });
                break;
        }
        if (message) {
            Session.getInstance().send(message);
        }
    }
}
