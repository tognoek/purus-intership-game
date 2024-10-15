import CreateMessege from '../Script/CreateMessenge';
import CreateModel from '../Script/CreateModle';
import Messange from '../Services/Messange';
import Session from '../Services/Session';

export default class Input {
    constructor() {}

    public addListener() {
        window.addEventListener('keydown', this.controller);
    }

    controller(event: KeyboardEvent) {
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
