import LoadData from "../../../Script/LoadData";
import Button from "../../Config/Button";

export default class ButtonBackSpace {
    public button: Button;
    private assets: pc.Asset[];

    constructor() {
        this.button = new Button({ width: 2 * 70 + 10, height: 70 });
        this.assets = [
            LoadData.gI().assets[`back_space_1`],
            LoadData.gI().assets[`back_space_0`],
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
