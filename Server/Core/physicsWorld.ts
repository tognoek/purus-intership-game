import Ammo from 'ammojs-typed';

export default class PhysicsWorld {
    private dynamicsWorld: any;
    private ammo: any;

    constructor() {
        this.init();
    }

    async init() {
        this.ammo = await Ammo();

        const collisionConfiguration = new this.ammo.btDefaultCollisionConfiguration();
        const dispatcher = new this.ammo.btCollisionDispatcher(collisionConfiguration);
        const overlappingPairCache = new this.ammo.btDbvtBroadphase();
        const solver = new this.ammo.btSequentialImpulseConstraintSolver();
        this.dynamicsWorld = new this.ammo.btDiscreteDynamicsWorld(
            dispatcher,
            overlappingPairCache,
            solver,
            collisionConfiguration
        );

        this.dynamicsWorld.setGravity(new this.ammo.btVector3(0, -10, 0));
    }

    public addRigidBody(rigidBody: any) {
        this.dynamicsWorld.addRigidBody(rigidBody);
    }

    public removeRigidBody(rigidBody: any) {
        this.dynamicsWorld.removeRigidBody(rigidBody);
    }

    public stepSimulation(timeStep: number = 1 / 60, maxSubSteps: number = 10) {
        this.dynamicsWorld.stepSimulation(timeStep, maxSubSteps);
    }

    public getDynamicsWorld() {
        return this.dynamicsWorld;
    }
}
