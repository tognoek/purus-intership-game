import * as pc from 'playcanvas';

import Entity from "./Enity";

export default class Player extends Entity{
    private name: string;
    constructor(id: string, position: pc.Vec3, name : string){
        super(id, position);
        this.name = name;
    }

    public setPosition(position: {x: number,y :number, z:number}){
        super.setPosition(new pc.Vec3(position.x, position.y, position.z));
    }
}
