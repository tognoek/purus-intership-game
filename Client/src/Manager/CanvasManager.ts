import * as pc from 'playcanvas';

import GameCanvas from '../Scenes/GameCanvas';
import InputManager from './InputManager';

export default class CanvasManager {
    private app: pc.Application;
    private gameCanvas: GameCanvas;
    private input: InputManager;

    constructor() {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.app = new pc.Application(canvas, {
            mouse: new pc.Mouse(canvas),
            touch: new pc.TouchDevice(canvas),
            keyboard: new pc.Keyboard(window),
            elementInput: new pc.ElementInput(canvas),
        });
        this.gameCanvas = new GameCanvas(this.app);
        this.gameCanvas.setUp();
        this.input = new InputManager(this.app);
        this.input.addListener();
    }

    public getApp() {
        return this.app;
    }

    public addChild(enity: pc.Entity) {
        this.app.root.addChild(enity);
    }
    public removeChild(entity: pc.Entity) {
        this.app.root.removeChild(entity);
    }
}
