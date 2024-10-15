import * as pc from 'playcanvas';

export default class CreateModel {
    private static instance: CreateModel;
    private assets;
    private app: pc.Application;
    private assetListLoader: pc.AssetListLoader;
    private isLoad: boolean;

    private constructor(app: pc.Application) {
        this.app = app;
        this.isLoad = false;
        this.assets = {
            Mage: new pc.Asset('Character', 'model', {
                url: '../Assets/Models/mage.glb',
            }),
            Texteru: new pc.Asset('mage', 'texture', {
                url: '../Assets/Textures/mage.png',
            }),
            Idle: new pc.Asset('idle', 'animation', {
                url: '../Assets/Animations/idle.glb',
            }),
            Wlak: new pc.Asset('walk', 'animation', {
                url: '../Assets/Animations/walk.glb',
            }),
        };

        this.assetListLoader = new pc.AssetListLoader(Object.values(this.assets), app.assets);
        
    }

    public static getInstance(app: pc.Application | null): CreateModel {
        if (!app) {
            return CreateModel.instance;
        }
        if (!CreateModel.instance) {
            CreateModel.instance = new CreateModel(app);
        }
        return CreateModel.instance;
    }

    public load(callback: Function){
        this.assetListLoader.load(() => {
            callback()
        });
    }

    public createCharacter(
        name: string = 'Mage',
        position: { x: number; y: number; z: number }
    ): pc.Entity {
        let characterEntity: pc.Entity;
        characterEntity = new pc.Entity(name);
        this.app.root.addChild(characterEntity);
        characterEntity.addComponent('model', {
            type: 'asset',
            asset: this.assets.Mage,
        });
        characterEntity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        characterEntity.addComponent('animation', {
            assets: [this.assets.Idle, this.assets.Wlak],
        });
        characterEntity.setPosition(position.x, position.y, position.z);
        return characterEntity;
    }
}
