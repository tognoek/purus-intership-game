import * as pc from 'playcanvas';

import Session from './Session';
import Input from './Input';
import GameCanvas from './GameCanvas';
import CreateModel from '../Script/CreateModle';
import Camera from '../Entities/Camera';

export default class GameManager {
    private session: Session;
    private input: Input;
    private gameCanvas: GameCanvas;
    private camera: Camera;

    constructor() {
        this.session = Session.getInstance();
        this.input = new Input();
        this.gameCanvas = new GameCanvas();
        this.session.setGameCanvas(this.gameCanvas);
        this.camera = new Camera('camera', new pc.Vec3(), 'tognoek');
    }

    public setUp() {
        CreateModel.getInstance(this.gameCanvas.getApp()).load(() => {
            this.session.connect();
            this.input.addListener();
            this.session.gameCanvas?.getApp().root.addChild(this.camera.getCamera())
            this.session.setCamera(this.camera);
        });
    }
}
