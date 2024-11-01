import LoadData from '../../Script/LoadData';
import Button from './Button';

export default class ButtonNumber {
    private number: number;
    public button: Button;
    private assets: pc.Asset[];

    constructor(number: number) {
        if (number > 9){
            number -= 10;
        }
        this.number = number;
        this.button = new Button({ width: 70, height: 70 });
        this.assets = [
            LoadData.gI().assets[`keyboard_${this.number + 101}`],
            LoadData.gI().assets[`keyboard_${this.number}`],
        ];
        this.button.setImage(this.assets[1]);
    }

    public mouseDown(callBack: Function) {
        this.button.mouseDown(() => {
            callBack(this.number);
            this.button.setImage(this.assets[0]);
        });
    }

    public mouseUp(callBack: Function) {
        this.button.mouseUp(() => {
            callBack(this.number);
            this.button.setImage(this.assets[1]);
        });
    }
}
