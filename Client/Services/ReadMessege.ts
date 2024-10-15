import * as pc from 'playcanvas';

import Model from '../Entities/Model';
import Player from '../Entities/Player';
import CreateModel from '../Script/CreateModle';
import Session from './Session';

export default class ReadMessenge {
    constructor() {}

    public setIdUser(data: object) {
        let dataFormat = data as { [key: string]: string };
        let idUser = dataFormat['id'];
        Session.getInstance().setIdUser(idUser);
    }

    // public addModel
    public updateDataMap(data: object) {
        let dataFormat = data as { [key: string]: { x: number; y: number; z: number } };
        let keys = Object.keys(dataFormat);
        // console.log(keys)
        keys.forEach((key) => {
            let position = dataFormat[key];
            if (Session.getInstance().game.isPlayer(key)) {
                let model: Model | undefined;
                model = Session.getInstance().game.getModel(key);
                if (model) {
                    let player = Session.getInstance().game.getPlayer(key);
                    let user = Session.getInstance().game.getPlayer(Session.getInstance().getIdUser() ?? 'tognoek')
                    model.setPosition(position);
                    player?.setPosition(position);
                    if (user) {
                        Session.getInstance().camera?.update(user.getPosition());
                    }
                }
            } else {
                console.log(position, key);
                let entity = CreateModel.getInstance(null).createCharacter('mage', position);
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
