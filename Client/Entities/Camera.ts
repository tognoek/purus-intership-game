import Entity from "./Enity";

export default class Camera extends Entity{
    private target: string;
    private distance: number;

    constructor(id: string, position: pc.Vec3, target: string){
        super(id, position)
        this.target = target;
        this.distance = 1;
    }

    public getTarget(): string{
        return this.target;
    }

    
}