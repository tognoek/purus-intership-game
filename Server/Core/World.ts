import PhysicsWorld from "./PhysicsWorld";
import Models from "./Models";

export default class World{
    private idRoom: string;
    private physicWord: PhysicsWorld;
    
    constructor(idRoom: string) {
        this.idRoom = idRoom;
        this.physicWord = new PhysicsWorld();
    }
}