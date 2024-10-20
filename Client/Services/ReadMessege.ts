import * as pc from 'playcanvas';

import Model from '../Entities/Model';
import Player from '../Entities/Player';
import CreateModel from '../Script/CreateModle';
import Session from '../Core/Session';

export default class ReadMessenge {
    constructor() {}

    public setIdUser(data: object) {
        let dataFormat = data as { [key: string]: string };
        let idUser = dataFormat['id'];
        Session.getInstance().setIdUser(idUser);
    }

    public updatePoint(data: object){
        console.log(data[0])
        // data = data as {x: number, y: number, z: number, angle: number}[];
        // if (data.length == 0){
        //     return;
        // }
        let d = data[0]
        if (!d){
            return;
        }
        Session.getInstance().gameCanvas?.setPositionDot(new pc.Vec3(d.x, d.y, d.z));
    }

    // public addModel
    public updateDataPlayer(data: object) {
        let dataFormat = data as {
            [key: string]: { x: number; y: number; z: number; angle: number; status: string, char: number };
        };
        let keys = Object.keys(dataFormat);
        // console.log(keys)
        keys.forEach((key) => {
            let position = { x: dataFormat[key].x, y: dataFormat[key].y, z: dataFormat[key].z };
            let status = dataFormat[key].status;
            if (Session.getInstance().game.isPlayer(key)) {
                let model: Model | undefined;
                model = Session.getInstance().game.getModel(key);
                if (model) {
                    let player = Session.getInstance().game.getPlayer(key);
                    let user = Session.getInstance().game.getPlayer(
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
                        Session.getInstance().camera?.update(user.getPosition());
                    }
                }
            } else {
                let entity = CreateModel.getInstance(null).createCharacter(dataFormat[key].char, position);
                Session.getInstance().game.addPlayer(
                    new Player(key, new pc.Vec3(position.x, position.y, position.z), key)
                );
                Session.getInstance().game.addModel(key, new Model(key, entity));
            }
        });
        Session.getInstance()
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
                    Session.getInstance().game.remove(id);
                }
            });
    }
}
