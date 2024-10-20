import Player from "../Entities/Player";
import { generateUniqueRandomArray, randonUnique } from "../Utils/Math";

export default class Room{
    private id: string;
    private players: Set<Player>;
    private maxPlayer: number;
    private isChar: boolean[];

    constructor(id: string){
        this.maxPlayer = 4;
        this.id = id;
        this.players = new Set();
        this.isChar = [false, false, false, false, false];
    }

    public addPlayer(idPlayer: string): boolean{
        if (this.isPlayer(idPlayer)){
            return false;
        }
        const size = this.countPlayer();
        if (size >= this.maxPlayer){
            return false;
        }
        const player = new Player(idPlayer, null);
        let indexChar = randonUnique(this.isChar, this.maxPlayer);
        this.isChar[indexChar] = true;
        player.setChar(indexChar);
        this.players.add(player);
        return true;
    }

    public getDataChar(): Record<string, number>{
        let result: Record<string, number> = {};
        for (const player of this.players){
            result[player.getId()] = player.getChar(); 
        }
        return result;
    }
    public getPlayers(): Set<Player>{
        return this.players;
    }

    public countPlayer(): number{
        return this.players.size;
    }

    public updateAttack(playerA: string, playerB: string){
        const attack = this.getPlayer(playerA);
        const victim = this.getPlayer(playerB);
        if (attack && victim){
            console.log(attack.getId(), victim.getId());
            const dame = attack.getDame();
            victim.updateHp(-dame);
            attack.updatePoint(5);
        }
    }

    public getPlayer(idPlayer: string){
        for (const player of this.players){
            if (player.getId() == idPlayer){
                return player;
            }
        }
        return undefined;
    }

    public isPlayer(idPlayer: string): boolean{
        for (const player of this.players){
            if (player.getId() == idPlayer){
                return true;
            }
        }
        return false;
    }

    public removePlayer(id: string): boolean{
        for (const player of this.players) {
            if (player.getId() === id) {
                this.isChar[player.getChar()] = false;
                this.players.delete(player);
                return true;
            }
        }
        return false;
    }

    public getId(): string{
        return this.id;
    }
}