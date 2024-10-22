import * as pc from "playcanvas";

export default class LoadData{
    private static instance: LoadData;
    public assets;
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
        };

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