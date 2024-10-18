import PhysicsWorld from './PhysicsWorld';
import Models from './Models';
import Session from './Session';

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

    public getIdRoom(): string{
        return this.idRoom;
    }

    public addPlayer(idPlayer: string) {
        Models.getInstance().setInfo({ x: Math.random() * 4 - 8, y: 20, z: 1 }, { x: 1, y: 1, z: 1 });
        const rigidBody = Models.getInstance().createRigidBody();
        this.players.push(idPlayer);
        this.physicWorld.addRigidBody(idPlayer, rigidBody);
    }

    public addProjectile(idPlayer: string){
        let player = Session.getInstance().getPlayers().get(idPlayer);
        if (player){
            let idChar = player.getChar();
            let size;
            if (idChar)
            Models.getInstance().setInfo({x: 0, y: 0, z: 0}, {})
            let projectile = 
            
        }
    }

    public removePlayer(idPlayer: string) {
        this.players = this.players.filter(item => item != idPlayer);
        this.physicWorld.removeRigidBody(idPlayer);
    }

    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        this.physicWorld.applyForce(idPlayer, force);
    }

    public applyVelocity(idPlayer: string, velocity: {x: number, y: number, z: number}, angle: number){
        this.physicWorld.applyVelocity(idPlayer, velocity, angle);
    }

    public attack(idPlayer: string){
        this.physicWorld.attack(idPlayer);
    }

    public update(dt: number | null) {
        const timeStep = dt || 1 / 30;
        const maxSubSteps = 10;
        this.physicWorld.stepSimulation(timeStep, maxSubSteps);
    }
    private createGround() {
        const size = { x: 1150, y: 1, z: 1150 };
        const mass = 0;
        Models.getInstance().setInfo({ x: 0, y: -0.5, z: 0 }, size, mass);
        const groundRigidBody = Models.getInstance().createRigidBody();

        this.physicWorld.addRigidBody('ground', groundRigidBody);
    }
    public getData(): Record<string, { x: number; y: number; z: number }> {
        let result: Record<string, { x: number; y: number; z: number }> = {};
        this.players.forEach((id) => {
            let position = this.physicWorld.getRigidBodyPosition(id);
            if (position) {
                result[id] = position;
            }
        });
        return result;
    }
}
