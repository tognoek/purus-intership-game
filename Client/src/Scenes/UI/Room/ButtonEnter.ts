import LoadData from "../../../Script/LoadData";
import Button from "../../Config/Button";

export default class ButtonEnter {
    public button: Button;
    private assets: pc.Asset[];

    constructor() {
        this.button = new Button({ width: 90, height: 80 });
        this.assets = [
            LoadData.gI().assets[`enter_1`],
            LoadData.gI().assets[`enter_0`],
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
