import Rooms from './Rooms';
import Player from '../Entities/Player';
import World from './World';


export default class Session {
    private static instance: Session;
    private rooms: Rooms;
    private players: Map<string, Player>;
    private wolrds: Map<string, World>;

    private constructor() {
        this.rooms = new Rooms();
        this.players = new Map();
        this.wolrds = new Map();
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

    public getidRoomByIdPlayer(idPlayer: string | null): string | null{
        if (!idPlayer){
            return null;
        }
        return this.rooms.getIdRoomByIdPlayer(idPlayer);
    }

    public addPlayer(player: Player) {
        if (this.players.get(player.getId())){
            return;
        }
        this.players.set(player.getId(), player);
    }

    public newRoom(idRoom: string) {
        this.rooms.newRoom(idRoom);
        this.wolrds.set(idRoom, new World(idRoom));
    }

    public joinRoom(idRoom: string | undefined, idPlayer: string | null) {
        if (!idPlayer || !idRoom){
            console.log('input is null')
            return;
        }
        let player = this.players.get(idPlayer);
        if (!player){
            console.log('player is null');
            return;
        }
        if (!this.rooms.addPlayer(idRoom, player)){
            this.wolrds.set(idRoom, new World(idRoom));
        }
        this.wolrds.get(idRoom)?.addPlayer(player.getId());
    }

    public removePlayer(idPlayer: string) {
        this.players.delete(idPlayer);
        this.rooms.removePlayer(idPlayer);
    }

    public leaveRoom(idPlayer: string) {
        this.rooms.removePlayer(idPlayer);
    }

    public update(){
        this.wolrds.forEach(wolrd => {

        })
    }

    public reset() {
        // Reset logic...
    }
}
