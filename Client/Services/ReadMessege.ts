import * as pc from 'playcanvas';

import Model from '../Entities/Visible/Model';
import Player from '../Entities/Invisible/Player';
import CreateModel from '../Script/CreateModle';
import Session from '../Core/Session';
import Arrow from '../Entities/Visible/Arrow';
import Manager from '../Core/Manager';

export default class ReadMessenge {
    constructor() {}

    public setIdUser(data: object) {
        let dataFormat = data as { [key: string]: string };
        let idUser = dataFormat['id'];
        Session.getInstance().setIdUser(idUser);
    }

    public readDataUSer(data: object) {
        let dataFormat = data as {
            id: string;
            name: string;
            char: number;
            hp: number;
            point: number;
            dame: number;
        };
        Manager.gI().screen?.updateHpPoint(dataFormat.hp, dataFormat.point);
    }

    public readDataCreateColum(data: object) {
        const formattedArray = Object.values(data).map(({ x, y, z }) => [x, y, z]);
        formattedArray.forEach((data) => {
            const x = data[0];
            const y = data[1];
            const z = data[2];
            if (!Manager.gI().map.isColum(x, y, z)) {
                const entity = CreateModel.gI().createColum({ x: x, y: y, z: z });
                Manager.gI().canvas.addChild(entity);
            }
        });
    }

    public updatePointArrow(data: object) {
        let dataFormat = data as {
            [key: string]: { x: number; y: number; z: number; angle: number; char: number };
        };
        let keys = Object.keys(dataFormat);
        keys.forEach((key) => {
            let position = { x: dataFormat[key].x, y: dataFormat[key].y, z: dataFormat[key].z };
            if (Manager.gI().game.isArrow(key)) {
                let arrow = Manager.gI().game.getArrow(key);
                if (arrow) {
                    arrow.setPosition(position);
                    arrow.lookAt(position, dataFormat[key].angle);
                }
            } else {
                let entity = CreateModel.gI().createArrow(position);
                Manager.gI().canvas.addChild(entity);
                Manager.gI().game.addArrow(key, new Arrow(key, entity));
            }
        });
        Manager.gI().game.destroyArrow(keys);
    }

    // public addModel
    public updateDataPlayer(data: object) {
        let dataFormat = data as {
            [key: string]: {
                x: number;
                y: number;
                z: number;
                angle: number;
                status: string;
                char: number;
            };
        };
        let keys = Object.keys(dataFormat);
        // console.log(keys)
        keys.forEach((key) => {
            let position = { x: dataFormat[key].x, y: dataFormat[key].y, z: dataFormat[key].z };
            let status = dataFormat[key].status;
            if (Manager.gI().game.isPlayer(key)) {
                let model: Model | undefined;
                model = Manager.gI().game.getModel(key);
                if (model) {
                    let player = Manager.gI().game.getPlayer(key);
                    let user = Manager.gI().game.getPlayer(
                        Session.getInstance().getIdUser() ?? 'tognoek'
                    );
                    model.setPosition(position);
                    if (player?.setStatus(status)) {
                        model.updateAnimation();
                    }
                    model.updateAngle(
                        key,
                        new pc.Vec3(position.x, position.y, position.z),
                        dataFormat[key].angle
                    );
                    player?.setPosition(position);
                    if (user) {
                        Manager.gI().camera?.update(user.getPosition());
                    }
                }
            } else {
                let entity = CreateModel.gI().createCharacter(dataFormat[key].char, position);
                Manager.gI().canvas.addChild(entity);
                Manager.gI().game.addPlayer(
                    new Player(key, new pc.Vec3(position.x, position.y, position.z), key)
                );
                Manager.gI().game.addModel(key, new Model(key, entity));
            }
        });
        Manager.gI()
            .game.getPlayers()
            .forEach((player) => {
                let id = player.getId();
                let isEnable: boolean = false;
                keys.forEach((key) => {
                    if (key == id) {
                        isEnable = true;
                        return;
                    }
                });
                if (!isEnable) {
                    Manager.gI().game.remove(id);
                }
            });
    }
}
