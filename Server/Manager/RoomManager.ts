import Player from '../Entities/Player';
import Room from '../Entities/Room';

export default class RoomManager {
    private rooms: Set<Room>;
    private isRoom: Map<string, boolean>;
    constructor() {
        this.rooms = new Set();
        this.isRoom = new Map();
    }

    public checkRoom(id: string){
        return this.isRoom.get(id);
    }
    public newRoom(id: string) {
        this.isRoom.set(id, true);
        this.rooms.add(new Room(id));
    }

    public getRoom(id: string): Room | null {
        let result: Room | null = null;
        this.rooms.forEach((room) => {
            if (room.getId() == id) {
                result = room;
                return;
            }
        });
        return result;
    }

    public getIdRoomByIdPlayer(idPlayer: string): string | null {
        for (const room of this.rooms) {
            if (room.isPlayer(idPlayer)) {
                return room.getId();
            }
        }
        return null;
    }
    public removeRoom(idRoom: string) {
        for (const room of this.rooms) {
            if (room.getId() == idRoom) {
                this.rooms.delete(room);
                return;
            }
        }
    }

    public getPlayers(idPlayer: string): Set<Player> | null {
        for (const room of this.rooms) {
            if (room.getId() == idPlayer) {
                return room.getPlayers();
            }
        }
        return null;
    }

    public getPlayer(idPlayer: string) {
        let result;
        for (const room of this.rooms) {
            result = room.getPlayer(idPlayer);
            if (result) {
                return result;
            }
        }
        return null;
    }

    public addPlayer(id: string, idPlayer: string): boolean {
        for (const room of this.rooms) {
            if (room.getId() == id) {
                return room.addPlayer(idPlayer);
            }
        }
        return false;
    }

    public removePlayer(idPlayer: string) {
        this.rooms.forEach((room) => {
            if (room.removePlayer(idPlayer)) {
                this.clear();
                return;
            }
        });
    }

    public clear(): void {
        const Rommdelete: Room[] = [];

        this.rooms.forEach((room) => {
            if (room.countPlayer() === 0) {
                Rommdelete.push(room);
            }
        });

        Rommdelete.forEach((room) => {
            this.rooms.delete(room);
        });
    }

    public getDataChars(): Record<string, any> {
        let result: Record<string, any> = {};
        for (const room of this.rooms) {
            result[room.getId()] = room.getDataChar();
        }
        return result;
    }
}