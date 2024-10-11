import * as pc from "playcanvas";
export default class Entity{
    private id: number;
    private position: pc.Vec3;
    constructor(id: number, position: pc.Vec3){
        this.id = id;
        this.position = position;
    }
}