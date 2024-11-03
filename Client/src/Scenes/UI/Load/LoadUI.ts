import BackGround from "../../Config/Background";
import UI from "../InterfaceUI";
import ProgressBar from "./ProgressBar";

export default class LoadUI implements UI{

    private background: BackGround;
    private progressBar: ProgressBar;
    private screen: pc.Entity;

    constructor(screen: pc.Entity){
        this.screen = screen;
        this.background = new BackGround({
            width: this.screen.screen!.referenceResolution.x,
            height: this.screen.screen!.referenceResolution.y,
        });
        this.progressBar = new ProgressBar({width: 900, height: 80});
        this.progressBar.setLocal(0, -340, 0);
        this.init();
    }

    private init(){
        this.screen.addChild(this.background);
        this.screen.addChild(this.progressBar);
    }

    public setTime(time: number){
        this.progressBar.setTime(time);
    }

    close(): void {
        this.background.enabled = false;
        this.progressBar.enabled = false;
    }
    open(): void {
        this.background.enabled = true;
        this.progressBar.enabled = true;
    }
}