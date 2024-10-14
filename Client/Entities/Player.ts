import * as pc from 'playcanvas';

import Entity from "./Enity";

export default class Player extends Entity{
    private name: string;
    private player: Player;
    constructor(id: string, position: pc.Vec3, name : string, player : Player){
        super(id, position);
        this.name = name;
        this.player = player;
    }

    public setPosition(position: {x: number,y :number, z:number}){
        super.setPosition(new pc.Vec3(position.x, position.y, position.z));
    }
}
