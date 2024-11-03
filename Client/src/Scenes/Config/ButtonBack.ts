import LoadData from "../../Script/LoadData";
import Button from "./Button";

export default class ButtonBack {
    public button: Button;
    private assets: pc.Asset[];

    constructor() {
        this.button = new Button({ width: 200, height: 100 });
        this.assets = [
            LoadData.gI().assets[`back`],
            LoadData.gI().assets[`back`],
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
