import * as pc from 'playcanvas';
import LoadData from '../Script/LoadData';

export default class GameCanvas {
    private app: pc.Application;
    constructor(app: pc.Application) {
        this.app = app;
        
    }
    public setUp(){
        this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
        window.onresize = () => this.app.resizeCanvas();
        this.app.start();
    }
}
