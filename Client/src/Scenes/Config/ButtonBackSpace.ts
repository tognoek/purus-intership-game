import LoadData from "../../Script/LoadData";
import Button from "./Button";

export default class ButtonBackSpace {
    public button: Button;
    private assets: pc.Asset[];

    constructor() {
        this.button = new Button({ width: 100, height: 100 });
        this.assets = [
            LoadData.gI().assets[`remove`],
            LoadData.gI().assets[`remove`],
        ];
        this.button.setImage(this.assets[1]);
    }

    public mouseDown(callBack: Function) {
        this.button.mouseDown(() => {
            callBack();
            this.button.setImage(this.assets[0]);
        });
    }

    public mouseUp(callBack: Function) {
        this.button.mouseUp(() => {
            callBack();
            this.button.setImage(this.assets[1]);
        });
    }
}
