export default class Player {
    private id: string;
    private name: string;
    private hp: number;
    private point: number;
    private dame: number;
    private idChar: number;
    private maxHp: number;

    constructor(id: string, name: string | null) {
        this.id = id;
        this.name = name ?? this.id;
        this.maxHp = 5;
        this.hp = this.maxHp;;
        this.point = 0;
        this.dame = 10;
        this.idChar = 0;
    }

    public revive(){
        this.hp = this.maxHp;
    }

    public isDie(){
        return this.hp < 1;
    }

    public setChar(id: number) {
        this.idChar = id;
    }

    public getChar(): number {
        return this.idChar;
    }

    public updateHp(hp: number) {
        this.hp += hp;
    }

    public healing(hp: number){
        this.hp += hp;
        if (this.hp > this.maxHp){
            this.hp = this.maxHp;
        }
    }

    public getHp(): number {
        return this.hp;
    }

    public updatePoint(point: number) {
        this.point += point;
        if (this.point < 0) {
            this.point = 0;
        }
    }

    public getPoint(): number {
        return this.point;
    }

    public getDame(): number {
        return this.dame;
    }

    public updateDame(dame: number) {
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

    public toString() {
        return {
            id: this.id,
            name: this.name,
            char: this.idChar,
            hpMax: this.maxHp,
            hp: this.hp,
            point: this.point,
            dame: this.dame,
        };
    }
    public score(){
        return {
            id: this.id,
            name: this.name,
            char: this.idChar,
            point: this.point,
        };
    }
}
