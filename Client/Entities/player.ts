import * as pc from 'playcanvas';

import Entity from "./enity";

export default class Player extends Entity{
    private name: string;
    private player: Player;
    constructor(name : string, player : Player){
        super(1, new pc.Vec3());
        this.name = name;
        this.player = player;
    }
}
