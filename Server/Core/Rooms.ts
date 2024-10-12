import Player from '../Entities/Player';
import Room from './Room';

export default class Rooms {
    private rooms: Set<Room>;
    constructor() {
        this.rooms = new Set();
    }
    public newRoom(id: string) {
        this.rooms.add(new Room(id));
    }

    public removeRoom(idRoom: string){
        let temp: Room | null = null;
        this.rooms.forEach(room => {
            if (room.getId() == idRoom){
                temp = room;
            }
        })
        if (temp){
            this.rooms.delete(temp);
        }
    }

    public getPlayers(id: string): Set<Player> | null {
        this.rooms.forEach(room => {
            if (room.getId() == id) {
                return room.getPlayer();
            }
        });
        return null;
    }

    public getIdRoomByIdPlayer(idPlayer: string): string | null{
        this.rooms.forEach(room => {
            if (room.isPlayer(idPlayer)){
                return room.getId();
            }
        })
        return null;
    }

    public getRoom(id: string): Room | null {
        let result: Room | null = null;
        this.rooms.forEach(room => {
            if (room.getId() == id){
                result = room;
                return;
            }
        })
        return result;
    }

    public addPlayer(id: string, player: Player): boolean{
        this.rooms.forEach((room) => {
            if (room.getId() == id) {
                room.addPlayer(player);
                return true;
            }
        });
        this.newRoom(id);
        this.getRoom(id)?.addPlayer(player);
        return false
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
        const Rommdelete: Room[] = [];

        this.rooms.forEach(room => {
            if (room.countPlayer() === 0) {
                Rommdelete.push(room);
            }
        });

        Rommdelete.forEach((room) => {
            this.rooms.delete(room);
        });
    }
}
