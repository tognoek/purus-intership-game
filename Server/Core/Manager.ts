import RoomManager from '../Manager/RoomManager';
import WorldManager from '../Manager/WorldManager';

export default class Manager {
    public static instance: Manager;

    public roomManager: RoomManager;
    public worldManager: WorldManager;

    private constructor() {
        this.roomManager = new RoomManager();
        this.worldManager = new WorldManager();
    }

    public static gI(): Manager {
        if (!Manager.instance) {
            Manager.instance = new Manager();
        }
        return Manager.instance;
    }

    public newRoom(idRoom: string) {
        if (this.roomManager.checkRoom(idRoom)) {
            return;
        }
        this.roomManager.newRoom(idRoom);
        this.worldManager.newWorld(idRoom);
    }

    public joinRoom(idRoom: string, idPlayer: string) {
        if (this.roomManager.addPlayer(idRoom, idPlayer)) {
            this.worldManager.addPlayer(idRoom, idPlayer);
        }
    }

    public getIdRoomByIdPlayer(idPlayer: string) {
        return this.roomManager.getIdRoomByIdPlayer(idPlayer);
    }

    public removePlayer(idPlayer: string) {
        const idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        this.roomManager.removePlayer(idPlayer);
        this.worldManager.removePlayer(idRoom!, idPlayer);
    }

    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (idRoom) {
            this.worldManager.getWorld(idRoom)?.applyForce(idPlayer, force);
        }
    }

    public applyVelocity(
        idPlayer: string,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (idRoom) {
            this.worldManager.getWorld(idRoom)?.applyVelocity(idPlayer, velocity, angle);
        }
    }

    public attack(idPlayer: string) {
        let idRoom = this.roomManager.getIdRoomByIdPlayer(idPlayer);
        if (idRoom) {
            // this.worldManager.getWorld(idRoom)?.attack(idPlayer);
        }
    }

    public getDataPositionAll(): Record<string, any> {
        return this.worldManager.getPosition();
    }

    public getDataCharAll(): Record<string, any> {
        return this.roomManager.getDataChars();
    }
}
