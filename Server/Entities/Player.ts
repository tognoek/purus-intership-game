export default class Player{
    private id: string;
    private name: string;

    constructor(id: string, name : string | null){
        // this.name = name;
        this.id = id;
        this.name = name ?? this.id;
    }
    public getId(): string{
        return this.id;
    }
    public getName(): string{
        return this.name;
    }
    public setName(name: string): void{
        this.name = name;
    }
}