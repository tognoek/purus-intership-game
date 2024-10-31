import Player from '../Entities/Player';
import Room from '../Entities/Room';

export default class RoomManager {
    private rooms: Set<Room>;
    private isRoom: Map<string, boolean>;
    public maxSize: number;

    constructor() {
        this.rooms = new Set();
        this.isRoom = new Map();
        this.maxSize = 3;
    }

    public checkRoom(id: string) {
        return this.isRoom.get(id);
    }
    public newRoom(id: string) {
        this.isRoom.set(id, true);
        this.rooms.add(new Room(id, this.maxSize));
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

    public getRoomByIdPlayer(idPlayer: string) {
        for (const room of this.rooms) {
            if (room.isPlayer(idPlayer)) {
                return room;
            }
        }
        return null;
    }

    public getRoomEnd(): string[] {
        let result: string[] = [];
        this.rooms.forEach((room) => {
            if (room.getStatus() == 'lock') {
                result.push(room.getId());
            }
        });
        return result;
    }
    public revivePlayer(idPlayer: string) {
        for (const room of this.rooms) {
            if (room.isPlayer(idPlayer)) {
                room.revivePlayer(idPlayer);
            }
        }
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
                this.isRoom.set(room.getId(), false);
                this.rooms.delete(room);
                return;
            }
        }
    }

    public getAllPlayers(): Player[] {
        let result: Player[] = [];
        this.rooms.forEach((room) => {
            room.getPlayers().forEach((player) => {
                result.push(player);
            });
        });
        return result;
    }

    public getPlayers(idRoom: string): Set<Player> | null {
        for (const room of this.rooms) {
            if (room.getId() == idRoom) {
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

    public updateAttack(data: { playerA: string; playerB: string }) {
        const room = this.getRoomByIdPlayer(data.playerA);
        if (room) {
            room.updateAttack(data.playerA, data.playerB);
        }
    }

    public update() {
        this.rooms.forEach((room) => {
            room.update();
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
            this.isRoom.set(room.getId(), false);
            this.rooms.delete(room);
        });
    }

    public getStatus(id: string) {
        for (const room of this.rooms) {
            if (room.getId() == id) {
                return room.getStatus();
            }
        }
        return -1;
    }

    public getPlayerDies() {
        let result: Record<string, string[]> = {};
        this.rooms.forEach((room) => {
            result[room.getId()] = room.getPlayerDie();
        });
        return result;
    }

    public getDataChars(): Record<string, any> {
        let result: Record<string, any> = {};
        for (const room of this.rooms) {
            result[room.getId()] = room.getDataChar();
        }
        return result;
    }

    public getDataSizeRooms(): Record<string, number> {
        let result: Record<string, number> = {};
        for (const room of this.rooms) {
            result[room.getId()] = room.countPlayer();
        }
        return result;
    }

    public getDataNamePlayer() {
        let result: Record<string, any> = {};
        for (const room of this.rooms) {
            result[room.getId()] = room.getNamePLayers();
        }
        return result;
    }

    public getAllDataPlayer() {
        let result: Record<
            string,
            {
                id: string;
                name: string;
                char: number;
                hpMax: number;
                hp: number;
                point: number;
                dame: number;
            }
        > = {};
        this.rooms.forEach((room) => {
            result = { ...result, ...room.getAllDataPlayers() };
        });
        return result;
    }
    public getAllDataTime() {
        let result: Record<string,{id: string, time: number}> = {};
        this.rooms.forEach((room) => {
            result[room.getId()] = room.getDataTime();
        });
        return result;
    }
    public getAllDataScore() {
        let result: Record<
            string,
            {
                id: string;
                name: string;
                char: number;
                point: number;
            }
        > = {};
        this.rooms.forEach((room) => {
            result = { ...result, ...room.getAllDataScore() };
        });
        return result;
    }
}
