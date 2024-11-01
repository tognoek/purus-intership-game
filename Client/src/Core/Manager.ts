import Camera from '../Entities/Visible/Camera';
import CanvasManager from '../Manager/CanvasManager';
import GameManager from '../Manager/GameManager';
import MapManager from '../Manager/MapManager';
import ScreenManager from '../Manager/ScreenManager';

export default class Manager {
    private static instance: Manager;
    public screen: ScreenManager | null;
    public canvas: CanvasManager;
    public game: GameManager;
    public camera: Camera;
    public map: MapManager;

    private constructor() {
        this.canvas = new CanvasManager();
        this.game = new GameManager();
        this.camera = new Camera();
        this.map = new MapManager();
        this.canvas.addChild(this.camera.getCamera());
        this.screen = null;
    }

    public updateScreen(){
        this.screen = new ScreenManager();
    }

    public static gI(){
        if (!Manager.instance){
            Manager.instance = new Manager();
        }
        return Manager.instance;
    }

    public angleLockAt(){
        return this.camera.getAngle();
    }

    public getApp(){
        return this.canvas.getApp();
    }
}
