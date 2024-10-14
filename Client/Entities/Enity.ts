import * as pc from "playcanvas";
export default class Entity{
    private id: string;
    private position: pc.Vec3;
    constructor(id: string, position: pc.Vec3){
        this.id = id;
        this.position = position;
    }

    public setPosition(position: pc.Vec3){
        this.position = position;
    }

    public getPosition(): pc.Vec3{
        return this.position;
    }

    public getId(): string{
        return this.id;
    }
}