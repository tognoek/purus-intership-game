import * as pc from 'playcanvas';
import Camera from '../Entities/Camera';
import Model from '../Entities/Model';
import Player from '../Entities/Player';
import Session from '../Services/Session';

export default class Game {
    private players: Map<string, Player>;
    private status: string;
    private models: Map<string, Model>;

    constructor() {
        this.models = new Map();
        this.players = new Map();
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
