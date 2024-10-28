import * as pc from "playcanvas";

export default class LoadData{
    private static instance: LoadData;
    public assets: Record<string, any> = {};
    private app: pc.Application;
    private assetListLoader: pc.AssetListLoader;

    private constructor(app: pc.Application){
        this.app = app;
        this.assets = {
            Mage: new pc.Asset('mage', 'model', {
                url: '../Assets/Models/mage.glb',
            }),
            Bar: new pc.Asset('bar', 'model', {
                url: '../Assets/Models/bar.glb',
            }),
            Knight: new pc.Asset('knight', 'model', {
                url: '../Assets/Models/knight.glb',
            }),
            Rogue: new pc.Asset('rogue', 'model', {
                url: '../Assets/Models/rogue.glb',
            }),
            Arrow: new pc.Asset('arrow', 'model', {
                url: '../Assets/Models/arrow.glb',
            }),
            Colum: new pc.Asset('colum', 'model', {
                url: '../Assets/Models/colum.glb',
            }),

            Idle: new pc.Asset('idle', 'animation', {
                url: '../Assets/Animations/idle_nd.glb',
            }),
            Walk: new pc.Asset('walk', 'animation', {
                url: '../Assets/Animations/run.glb',
            }),
            Attack: new pc.Asset('attack', 'animation', {
                url: '../Assets/Animations/attack.glb',
            }),
            Shoot: new pc.Asset('attack', 'animation', {
                url: '../Assets/Animations/shoot.glb',
            }),
            Jump: new pc.Asset('jump', 'animation', {
                url: '../Assets/Animations/jump.glb',
            }),
            FontGamja: new pc.Asset('gamja', 'font', {
                url: '../Assets/Fonts/courier.json',
            }),
            enter_0: new pc.Asset('enter_0', 'texture', {
                url: '../Assets/Keys/keyboard_99.png',
            }),
            enter_1: new pc.Asset('enter_1', 'texture', {
                url: '../Assets/Keys/keyboard_200.png',
            }),
            back_space_0: new pc.Asset('back_space_0', 'texture', {
                url: '../Assets/Keys/keyboard_207.png',
            }),
            back_space_1: new pc.Asset('back_space_1', 'texture', {
                url: '../Assets/Keys/keyboard_214.png',
            }),
            gray_background_box: new pc.Asset('gray_background_box', 'texture', {
                url: '../Assets/Texture/background.png',
            }),
            background_cute: new pc.Asset('background_cute', 'texture', {
                url: '../Assets/Texture/background_cute_2nd.jpg',
            }),
            background_button: new pc.Asset('background_button', 'texture', {
                url: '../Assets/Texture/background_button.png',
            }),
            background_brow: new pc.Asset('background_brow', 'texture', {
                url: '../Assets/Texture/background_brow.jpg',
            }),
            background_text: new pc.Asset('background_text', 'texture', {
                url: '../Assets/Texture/background_wood.png',
            }),
        };
        for (let i = 0; i < 10; i++) {
            let id = `keyboard_${i}`;
            this.assets[id] = new pc.Asset(id, 'texture', {
                url: `../Assets/Numbers/${id}.png`,
            });
            id = `keyboard_${i + 101}`;
            this.assets[id] = new pc.Asset(id, 'texture', {
                url: `../Assets/Numbers/${id}.png`,
            });
        }

        this.assetListLoader = new pc.AssetListLoader(Object.values(this.assets), this.app.assets);
    }

    public static gI(app: pc.Application | null = null){
        if (!app){
            return LoadData.instance;
        }
        if (!LoadData.instance){
            LoadData.instance = new LoadData(app);
        }
        return LoadData.instance;
    }

    public Loader(callback: Function){
        this.assetListLoader.load(() => {
            callback();
        })
    }


}