import Player from '../Entities/Player';
import Room from './Room';
import { v4 as uuidv4 } from 'uuid';

export default class Rooms {
    private rooms: Map<string, Room>;
    constructor() {
        this.rooms = new Map();
    }
    public newRoom(id: string) {
        this.rooms.set(uuidv4(), new Room(id));
    }

    public removeRoom(idRoom: string){
        for (const room of this.rooms){
            if (room[1].getId() == idRoom){
                this.rooms.delete(room[0]);
                return;
            }
        }
    }

    public getPlayers(id: string): Set<Player> | null {
        this.rooms.forEach((room) => {
            if (room.getId() == id) {
                return room.getPlayer();
            }
        });
        return null;
    }

    public getRoom(id: string): Room | undefined {
        this.rooms.forEach(room => {
            if (room.getId() == id){
                return room;
            }
        })
        return undefined;
    }

    public addPlayer(id: string, player: Player | undefined){
        if (!player){
            return;
        }
        this.rooms.forEach((room) => {
            if (room.getId() == id) {
                room.addPlayer(player);
                return;
            }
        });
        this.newRoom(id);
        this.getRoom(id)?.addPlayer(player);
    }

    public removePlayer(idPlayer: string){
        this.rooms.forEach(room => {
            if (room.removePlayer(idPlayer)){
                this.clear();
                return;
            };
        })
    }

    public clear(): void {
        const keysToDelete: string[] = [];

        this.rooms.forEach((room, key) => {
            if (room.countPlayer() === 0) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach((key) => {
            this.rooms.delete(key);
        });
    }
}
