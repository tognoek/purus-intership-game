import Rooms from './Rooms';
import Player from '../Entities/Player';
import World from './World';


export default class Session {
    private static instance: Session;
    private rooms: Rooms;
    private players: Map<string, Player>;
    private wolrds: Set<World>;

    private constructor() {
        this.rooms = new Rooms();
        this.players = new Map();
        this.wolrds = new Set();
    }

    public static getInstance(): Session {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public getPlayers(): Map<string, Player>{
        return this.players;
    }

    public addPlayerRoom(idRoom: string, player: Player) {
        this.players.set(player.getId(), player);
        this.rooms.addPlayer(idRoom, player);
    }

    public addPlayer(player: Player) {
        this.players.set(player.getId(), player);
    }

    public newRoom(idRoom: string) {
        this.rooms.newRoom(idRoom);
        this.wolrds.add(new World(idRoom));
    }

    public joinRoom(idRoom: string, idPlayer: string) {
        this.rooms.addPlayer(idRoom, this.players.get(idPlayer));
    }

    public removePlayer(idPlayer: string) {
        this.players.delete(idPlayer);
        this.rooms.removePlayer(idPlayer);
    }

    public leaveRoom(idPlayer: string) {
        this.rooms.removePlayer(idPlayer);
    }

    public reset() {
        // Reset logic...
    }
}
