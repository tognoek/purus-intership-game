export default class Player {
    private id: string;
    private name: string;
    private hp: number;
    private point: number;
    private dame: number;
    private idChar: number;

    constructor(id: string, name: string | null) {
        // this.name = name;
        this.id = id;
        this.name = name ?? this.id;
        this.hp = 100;
        this.point = 0;
        this.dame = 10;
        this.idChar = 0;
    }

    public setChar(id: number){
        this.idChar = id;
    }

    public getChar(): number{
        return this.idChar;
    }

    public updateHp(hp: number) {
        this.hp += hp;
    }

    public getHp(): number{
        return this.hp;
    }

    public updatePoint(point: number) {
        this.point += point;
        if (this.point < 0){
            this.point = 0;
        }
    }

    public getPoint(): number{
        return this.point;
    }

    public getDame(): number {
        return this.dame;
    }

    public updateDame(dame: number){
        this.dame += dame;
    }

    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
}
