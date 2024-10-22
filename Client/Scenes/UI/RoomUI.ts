import * as pc from 'playcanvas';

import LoadData from '../../Script/LoadData';

export default class RoomUI {
    private screen: pc.Entity;
    private margin: number[];
    private hp: pc.Entity;
    private point: pc.Entity;
    private button: pc.Entity;

    constructor(screen: pc.Entity) {
        this.screen = screen;
        this.margin = [10, -10];
        this.hp = new pc.Entity();
        this.point = new pc.Entity();
        this.button = new pc.Entity();
        this.init();
    }

    private init() {
        this.hp.setLocalPosition(this.margin[0], this.margin[1], 0);
        this.hp.addComponent('element', {
            pivot: new pc.Vec2(0, 1),
            anchor: new pc.Vec4(0, 1, 0, 1),
            fontAsset: LoadData.gI().assets.FontGamja.id,
            fontSize: 42,
            text: 'Hp: 0',
            type: pc.ELEMENTTYPE_TEXT,
            width: 200,
            height: 50,
        });
        this.point.setLocalPosition(this.margin[0], this.margin[1] - 42, 0);
        this.point.addComponent('element', {
            pivot: new pc.Vec2(0, 1),
            anchor: new pc.Vec4(0, 1, 0, 1),
            fontAsset: LoadData.gI().assets.FontGamja.id,
            fontSize: 42,
            text: 'Point: 0',
            type: pc.ELEMENTTYPE_TEXT,
            width: 200,
            height: 50,
        });

        this.button.addComponent('element', {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5), // Đặt ở giữa màn hình
            pivot: new pc.Vec2(0.5, 0.5),
            text: 'Nhấn tôi',
            fontSize: 32,
            width: 200,
            height: 100,
            color: new pc.Color(1, 1, 1), // Màu chữ
            backgroundColor: new pc.Color(0.5, 0.5, 0.5), // Màu nền
        });

        // Tạo hình nền cho button
        const background = new pc.Entity();
        background.addComponent('element', {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5), // Đặt ở giữa màn hình
            pivot: new pc.Vec2(0.5, 0.5),
            width: 200,
            height: 100,
            color: new pc.Color(0.5, 0.5, 0.5), // Màu nền
        });

        // Thêm background vào button
        this.button.addChild(background);

        // Tạo hiệu ứng nhấn xuống
        this.button.on('mousedown', () => {
            this.button.setLocalScale(0.9, 0.9, 1); // Nhấn xuống
        });

        this.button.on('mouseup', () => {
            this.button.setLocalScale(1, 1, 1); // Khôi phục kích thước
        });

        // Thêm button vào scene
        this.screen.addChild(this.button);
        // this.screen.addChild(this.hp);
        // this.screen.addChild(this.point);
    }

    public updateHp(hp: number){
        this.hp.element!.text = `Hp: ${hp}`;
    }

    public updatePoint(point: number){
        this.point.element!.text = `Point: ${point}`;
    }
}
