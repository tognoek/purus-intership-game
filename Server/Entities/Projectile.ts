export default class Projectile{
    private player: string;
    private title: number;
    constructor(player: string, title: number = 0) {
        this.player = player;
        this.title = title;
    }

    public getIdPlayer(): string{
        return this.player;
    }
}