import Player from "../Entities/Player";

export default class Room{
    private id: string;
    private players: Set<Player>;
    constructor(id: string){
        this.id = id;
        this.players = new Set();
    }

    public addPlayer(player: Player): void {
        this.players.add(player);
    }

    public isPlayer(idPlayer: string): boolean{
        let result: boolean = false;
        this.players.forEach(player => {
            if (player.getId() == idPlayer){
                result = true;
                return;
            }
        })
        return result;
    }

    public getPlayer(): Set<Player>{
        return this.players;
    }

    public countPlayer(): number{
        return this.players.size;
    }

    public removePlayer(id: string): boolean{
        for (const player of this.players) {
            if (player.getId() === id) {
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