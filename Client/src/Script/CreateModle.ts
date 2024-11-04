import * as pc from 'playcanvas';
import LoadData from './LoadData';

export default class CreateModel {
    private static instance: CreateModel;

    private constructor() {
    }

    public static gI(): CreateModel {
        if (!CreateModel.instance) {
            CreateModel.instance = new CreateModel();
        }
        return CreateModel.instance;
    }

    public createArrow(position: { x: number; y: number; z: number }): pc.Entity {
        const arrowEnity = new pc.Entity('arrow');
        arrowEnity.addComponent('model', {
            type: 'asset',
            asset: LoadData.gI().assets.Arrow,
        });
        arrowEnity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        arrowEnity.setPosition(position.x, position.y, position.z);
        arrowEnity.setLocalScale(0.2, 0.2, 0.2);
        return arrowEnity;
    }
    public createColum(position: { x: number; y: number; z: number }): pc.Entity {
        const columEnity = new pc.Entity('arrow');
        columEnity.addComponent('model', {
            type: 'asset',
            asset: LoadData.gI().assets.Colum,
        });
        columEnity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        columEnity.setPosition(position.x, position.y, position.z);
        return columEnity;
    }
    public createCharacter(id: number, position: { x: number; y: number; z: number }): pc.Entity {
        let characterEntity: pc.Entity;
        let data: pc.Asset;
        let name: string;
        let attack: pc.Asset;
        data = LoadData.gI().assets.Mage;
        name = 'mage';
        attack = LoadData.gI().assets.Shoot;
        if (id == 1) {
            data = LoadData.gI().assets.Bar;
            name = 'bar';
            attack = LoadData.gI().assets.Attack;
        }
        if (id == 2) {
            data = LoadData.gI().assets.Knight;
            name = 'knight';
            attack = LoadData.gI().assets.Attack;
        }
        if (id == 3) {
            data = LoadData.gI().assets.Rogue;
            name = 'rogue';
        }
        characterEntity = new pc.Entity(name);
        characterEntity.addComponent('model', {
            type: 'asset',
            asset: data,
        });
        characterEntity.addComponent('rigidbody', {
            type: 'dynamic',
        });
        characterEntity.addComponent('animation', {
            assets: [LoadData.gI().assets.Idle, LoadData.gI().assets.Walk, attack, LoadData.gI().assets.Jump],
        });
        characterEntity.setPosition(position.x, position.y, position.z);
        return characterEntity;
    }
}
