import * as pc from 'playcanvas';

import Model from '../Entities/Visible/Model';
import Player from '../Entities/Invisible/Player';
import Session from '../Core/Session';
import Arrow from '../Entities/Visible/Arrow';
import Manager from '../Core/Manager';

export default class GameManager {
    private players: Map<string, Player>;
    private status: string;
    private models: Map<string, Model>;
    private arrows: Map<string, Arrow>;

    constructor() {
        this.models = new Map();
        this.players = new Map();
        this.arrows = new Map();
        this.status = 'play';
    }

    public getStatus(): string {
        return this.status;
    }

    public remove(id: string) {
        this.players.delete(id);
        let enity = this.models.get(id);
        this.models.delete(id);
        enity?.destroy();
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public addArrow(key: string, arrow: Arrow){
        this.arrows.set(key, arrow);
    }

    public isArrow(idArrow: string){
        let result: boolean = false;
        this.arrows.forEach((arrow) => {
            if (arrow.getId() == idArrow) {
                result = true;
            }
        });
        return result;
    }

    public getArrow(id: string){
        return this.arrows.get(id);
    }

    public destroyArrow(data: string[]){
        let deleteArrow: Arrow[] = [];
        this.arrows.forEach((arrow, key) => {
            let check = false;
            data.forEach(k => {
                if (k == key){
                    check = true;
                    return;
                }
            })
            if (!check){
                deleteArrow.push(arrow);
            }
        })
        deleteArrow.forEach(item => {
            Manager.gI().canvas.removeChild(item.getEnity());
        })
    }

    public addPlayer(player: Player) {
        this.players.set(player.getId(), player);
    }

    public getPlayers(): Map<string, Player> {
        return this.players;
    }

    public isPlayer(id: string) {
        let result: boolean = false;
        this.players.forEach((player) => {
            if (player.getId() == id) {
                result = true;
            }
        });
        return result;
    }

    public getPlayer(id: string) {
        return this.players.get(id);
    }

    public getModel(id: string) {
        return this.models.get(id);
    }

    public addModel(idPlayer: string, model: Model) {
        this.models.set(idPlayer, model);
    }

    public rotateUser(angel: { x: number; y: number; z: number }) {
        let user = Session.getInstance().getIdUser();
        if (user) {
            this.models.get(user)?.rotate(angel);
        }
    }
    public lockAtUser(position: pc.Vec3) {
        let user = Session.getInstance().getIdUser();
        if (user) {
            this.models.get(user)?.lookAt(position);
        }
    }
}
