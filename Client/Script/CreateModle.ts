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
            Idle: new pc.Asset('idle', 'animation', {
                url: '../Assets/Animations/idle_nd.glb',
            }),
            Walk: new pc.Asset('walk', 'animation', {
                url: '../Assets/Animations/run.glb',
            }),
            Attack: new pc.Asset('attack', 'animation', {
                url: '../Assets/Animations/attack.glb',
            }),
            Jump: new pc.Asset('jump', 'animation', {
                url: '../Assets/Animations/jump.glb',
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

    public load(callback: Function) {
        this.assetListLoader.load(() => {
            callback();
        });
    }

    public createCharacter(id: number, position: { x: number; y: number; z: number }): pc.Entity {
        let characterEntity: pc.Entity;
        let data: pc.Asset;
        let name: string;
        data = this.assets.Mage;
        name = 'mage';
        if (id == 1) {
            data = this.assets.Bar;
            name = 'bar';
        }
        if (id == 2) {
            data = this.assets.Knight;
            name = 'knight';
        }
        if (id == 3) {
            data = this.assets.Rogue;
            name = 'rogue';
        }
        characterEntity = new pc.Entity(name);
        this.app.root.addChild(characterEntity);
        characterEntity.addComponent('model', {
            type: 'asset',
            asset: data,
        });
        characterEntity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        characterEntity.addComponent('animation', {
            assets: [this.assets.Idle, this.assets.Walk, this.assets.Attack, this.assets.Jump],
        });
        characterEntity.setPosition(position.x, position.y, position.z);
        characterEntity.setLocalScale(0.1, 0.1, 0.1)
        return characterEntity;
    }
}
