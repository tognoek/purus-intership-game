import Session from './Session';
import Manager from './Manager';
import LoadData from '../Script/LoadData';

export default class Game {
    private session: Session;

    constructor() {
        this.session = Session.gI();
    }

    public setUp() {
        const app = Manager.gI().getApp();
        LoadData.gI(app).Loader(() => {
            console.log("Load")
            this.session.connect();
            Manager.gI().updateScreen();
        });
    }
}
