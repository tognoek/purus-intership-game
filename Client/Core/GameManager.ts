import Session from '../Services/Session';
import Game from './Game';

export default class GameManager {
    private session: Session;
    private game: Game;

    constructor() {
        this.game = new Game();
        this.session = Session.getInstance();
    }

    public connect() {
        this.session.connect();
    }
}
