import * as pc from 'playcanvas'

export default class Model{
    private id: string;
    private model: pc.Entity;
    constructor(id: string, model: pc.Entity){
        this.id = id;
        this.model = model;
    }

    public destroy(){
        this.model.destroy();
    }

    public setPosition(position: {x: number, y: number, z:number}){
        this.model.setPosition(position.x, position.y, position.z);
    }
}