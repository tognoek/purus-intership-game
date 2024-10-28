import Colum from "../Entities/Invisible/Colum";

export default class MapManager{
    private colums: Array<Colum>;
    constructor() {
        this.colums = new Array();
    }
    public addColum(x: number, y: number, z: number){
        this.colums.push(new Colum(x, y, z));
    }
    public isColum(x: number, y: number, z: number){
        for (const colum of this.colums){
            if (colum.is(x, y, z)){
                return true;
            }
        }
        this.addColum(x, y, z)
        return false;
    }
}