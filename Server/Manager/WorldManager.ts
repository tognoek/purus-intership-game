import World from '../Entities/World';

export default class WorldManager {
    private worlds: Map<string, World>;

    constructor() {
        this.worlds = new Map();
    }

    public newWorld(idRoom: string) {
        this.worlds.set(idRoom, new World());
    }

    public getWorld(idRoom: string) {
        return this.worlds.get(idRoom);
    }

    public addPlayer(idRoom: string, idPlayer: string) {
        this.worlds.get(idRoom)?.addPlayer(idPlayer);
    }

    public addProjectile(idRoom: string, idPlayer: string, idChar: number) {
        this.worlds.get(idRoom)?.addProjectile(idPlayer, idChar);
    }

    public removePlayer(idRoom: string, idPlayer: string) {
        this.worlds.get(idRoom)?.removePlayer(idPlayer);
    }

    public update() {
        this.worlds.forEach((world) => {
            world.update(null);
        });
    }

    public getPositions(): Record<string, any> {
        let result: Record<string, any> = {};
        this.worlds.forEach((world, id) => {
            result[id] = world.getData();
        });
        return result;
    }

    public getForces(): Record<string, any> {
        let result: Record<string, any> = {};
        this.worlds.forEach((world, id) => {
            result[id] = world.getForce();
        });
        return result;
    }

    public getCollisions(): Record<string, any> {
        let result: Record<string, any> = {};
        this.worlds.forEach((world, id) => {
            result[id] = world.getCollision();
        });
        return result;
    }

    public getProjectiles(){
        let result: Record<string, any> = {};
        this.worlds.forEach((world, id) => {
            result[id] = world.getProjectile();
        });
        return result;
    }

    public getCollisonProjectile(){
        let result: {playerA: string, playerB: string}[] = [];
        this.worlds.forEach((world, id) => {
            result.push(...world.getCollisionProjectile());
        });
        return result;
    }
}
