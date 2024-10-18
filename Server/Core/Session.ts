import Rooms from './Rooms';
import Player from '../Entities/Player';
import World from './World';
import Ammo from 'ammojs-typed';
import Projectile from '../Entities/Projectile';

export default class Session {
    private static instance: Session;
    private rooms: Rooms;
    private players: Map<string, Player>;
    private worlds: Map<string, World>;
    private ammo!: typeof Ammo;
    readonly point: number;

    private constructor() {
        this.rooms = new Rooms();
        this.players = new Map();
        this.worlds = new Map();
        this.point = 5;
    }

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public async init() {
        this.ammo = await Ammo();
    }

    public getAmmo(){
        return this.ammo;
    }

    public addPlayer(player: Player) {
        if (this.players.get(player.getId())) {
            return;
        }
        this.players.set(player.getId(), player);
    }
    public leaveRoom(idPlayer: string) {
        this.rooms.removePlayer(idPlayer);
        let idRomm = this.rooms.getIdRoomByIdPlayer(idPlayer);
        if (!idRomm) {
            return;
        }
        this.worlds.get(idRomm)?.removePlayer(idPlayer);
    }

    public joinRoom(idRoom: string | undefined, idPlayer: string | null) {
        if (!idPlayer || !idRoom) {
            console.log('input is null');
            return;
        }
        let player = this.players.get(idPlayer);
        if (!player) {
            console.log('player is null');
            return;
        }
        if (!this.rooms.addPlayer(idRoom, player)) {
            this.worlds.set(idRoom, new World(idRoom));
        }
        this.worlds.get(idRoom)?.addPlayer(player.getId());
    }

    public removePlayer(idPlayer: string) {
        this.players.delete(idPlayer);
        let idRoom = this.rooms.getIdRoomByIdPlayer(idPlayer);
        if (!idRoom) {
            return;
        }
        this.worlds.get(idRoom)?.removePlayer(idPlayer);
        this.rooms.removePlayer(idPlayer);
    }

    public updatePointHp(idAttack: string, idVictim: string){
        let attack = this.players.get(idAttack);
        let victim = this.players.get(idVictim);
        if (attack && victim){
            let dame = attack.getDame();
            victim.updateHp(dame);
            victim.updatePoint(-this.point)
            attack.updatePoint(this.point);
        }
    }

    public getPlayers(): Map<string, Player> {
        return this.players;
    }

    public getidRoomByIdPlayer(idPlayer: string | null): string | null {
        if (!idPlayer) {
            return null;
        }
        return this.rooms.getIdRoomByIdPlayer(idPlayer);
    }
    public newRoom(idRoom: string) {
        this.rooms.newRoom(idRoom);
        this.worlds.set(idRoom, new World(idRoom));
    }

    public update() {
        this.worlds.forEach((world) => {
            world.update(null);
        });
    }

    // World
    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        let idRoom = this.getidRoomByIdPlayer(idPlayer);
        if (idRoom) {
            this.worlds.get(idRoom)?.applyForce(idPlayer, force);
        }
    }

    public applyVelocity(idPlayer: string, velocity: { x: number; y: number; z: number }, angle: number) {
        let idRoom = this.getidRoomByIdPlayer(idPlayer);
        if (idRoom) {
            this.worlds.get(idRoom)?.applyVelocity(idPlayer, velocity, angle);
        }
    }

    public attack(idPlayer: string){
        let idRoom = this.getidRoomByIdPlayer(idPlayer);
        if (idRoom) {
            this.worlds.get(idRoom)?.attack(idPlayer);
        }
    }

    public getPosition(): Record<string, Record<string, { x: number; y: number; z: number }>> {
        let result: Record<string, Record<string, { x: number; y: number; z: number }>> = {};
        this.worlds.forEach((world, id) => {
            result[id] = world.getData();
        });
        return result;
    }

    public reset() {
        // Reset logic...
    }
}
