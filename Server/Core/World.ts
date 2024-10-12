import PhysicsWorld from './PhysicsWorld';
import Models from './Models';

export default class World {
    private idRoom: string;
    private physicWorld: PhysicsWorld;
    private players: Array<string>;

    constructor(idRoom: string) {
        this.idRoom = idRoom;
        this.physicWorld = new PhysicsWorld();
        this.players = new Array();
        this.createGround();
    }

    public addPlayer(idPlayer: string) {
        Models.getInstance().setInfo(
            { x: 1, y: 1, z: 1 },
            { x: 1, y: 1, z: 1 }
        );
        const rigidBody = Models.getInstance().createRigidBody();
        this.players.push(idPlayer);
        this.physicWorld.addRigidBody(idPlayer, rigidBody);
    }

    public update(dt: number | null) {
        const timeStep = dt || 1 / 60;
        const maxSubSteps = 10;

        this.physicWorld.stepSimulation(timeStep, maxSubSteps);
    }
    private createGround() {
        const size = { x: 50, y: 1, z: 50 };
        const mass = 0; 
        Models.getInstance().setInfo({ x: 0, y: -0.5, z: 0 }, size, mass); 
        const groundRigidBody = Models.getInstance().createRigidBody();

        this.physicWorld.addRigidBody('ground', groundRigidBody);
    }
}
