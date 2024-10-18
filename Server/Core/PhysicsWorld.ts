import Ammo from 'ammojs-typed';
import Session from './Session';

export default class PhysicsWorld {
    private dynamicsWorld!: Ammo.btDiscreteDynamicsWorld;
    private ammo!: typeof Ammo;
    private rigidBodies: Map<string, Ammo.btRigidBody>;
    private status: Map<string, string>;
    private attacks: Map<string, number>;
    private angles: Map<string, number>;
    private rigidBodyProjectiles: Map<string, Ammo.btRigidBody>;

    constructor() {
        this.status = new Map();
        this.angles = new Map();
        this.rigidBodies = new Map();
        this.attacks = new Map();
        this.rigidBodyProjectiles = new Map();
        this.init();
    }

    init() {
        this.ammo = Session.getInstance().getAmmo();
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
    public getCollidingRigidBodies(idRigidBody: string): string[] {
        const rigidBody = this.getRigidBodyById(idRigidBody);
        const collidingIds: string[] = [];

        if (!rigidBody) return collidingIds;
        const aabb0 = new this.ammo.btVector3();
        const aabb1 = new this.ammo.btVector3();

        rigidBody.getAabb(aabb0, aabb1);

        this.rigidBodies.forEach((body, id) => {
            if (id !== idRigidBody) {
                const aabb2 = new this.ammo.btVector3();
                const aabb3 = new this.ammo.btVector3();
                body.getAabb(aabb2, aabb3);

                if (this.isAABBIntersect(aabb0, aabb1, aabb2, aabb3)) {
                    collidingIds.push(id);
                }
            }
        });

        return collidingIds;
    }

    // Hàm kiểm tra va chạm giữa hai AABB
    private isAABBIntersect(
        aabb0Min: Ammo.btVector3,
        aabb0Max: Ammo.btVector3,
        aabb1Min: Ammo.btVector3,
        aabb1Max: Ammo.btVector3
    ): boolean {
        return (
            aabb0Min.x() <= aabb1Max.x() &&
            aabb0Max.x() >= aabb1Min.x() &&
            aabb0Min.y() <= aabb1Max.y() &&
            aabb0Max.y() >= aabb1Min.y() &&
            aabb0Min.z() <= aabb1Max.z() &&
            aabb0Max.z() >= aabb1Min.z()
        );
    }

    public addProjectile(idPlayer: string, idChar: number){
        
    }

    public addRigidBody(idPlayer: string, rigidBody: Ammo.btRigidBody) {
        this.dynamicsWorld.addRigidBody(rigidBody);
        this.rigidBodies.set(idPlayer, rigidBody);
        this.status.set(idPlayer, 'idle');
        this.angles.set(idPlayer, 180);
        this.attacks.set(idPlayer, Date.now());
    }

    public removeRigidBody(idPlayer: string) {
        const rigidBody = this.rigidBodies.get(idPlayer);
        if (rigidBody) {
            this.dynamicsWorld.removeRigidBody(rigidBody);
            this.rigidBodies.delete(idPlayer);
        }
    }

    public getRigidBodyById(idPlayer: string): Ammo.btRigidBody | undefined {
        return this.rigidBodies.get(idPlayer);
    }

    public getRigiBodis(): Map<string, Ammo.btRigidBody> {
        return this.rigidBodies;
    }
    public getRigidBodyPosition(
        id: string
    ): { x: number; y: number; z: number; angle: number; status: string } | null {
        const rigidBody = this.getRigidBodyById(id);
        if (rigidBody) {
            const motionState = rigidBody.getMotionState();
            if (motionState) {
                const transform = new this.ammo.btTransform();
                motionState.getWorldTransform(transform);
                const origin = transform.getOrigin();
                this.ammo.destroy(transform);
                let status = this.status.get(id);
                let angle = this.angles.get(id);
                return {
                    x: origin.x(),
                    y: origin.y(),
                    z: origin.z(),
                    angle: angle ?? 180,
                    status: status ?? 'idle',
                };
            }
        }
        return null;
    }
    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        const rigidBody = this.getRigidBodyById(idPlayer);
        if (rigidBody) {
            if (!this.getCollidingRigidBodies(idPlayer).includes('ground')) {
                return;
            }
            if (this.status.get(idPlayer) != 'jump') {
                this.status.set(idPlayer, 'jump');
            }
            if (!rigidBody.isActive()) {
                rigidBody.setActivationState(1);
            }
            const ammoForce = new this.ammo.btVector3(force.x, force.y, force.z);
            rigidBody.applyCentralForce(ammoForce);
            this.ammo.destroy(ammoForce);
        }
    }

    public attack(idPlayer: string) {
        if (this.status.get(idPlayer) != 'attack') {
            this.status.set(idPlayer, 'attack');
            this.attacks.set(idPlayer, Date.now());
        }
    }

    public applyVelocity(
        idPlayer: string,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        const rigidBody = this.getRigidBodyById(idPlayer);
        if (rigidBody) {
            velocity.x = 0;
            const status = this.status.get(idPlayer);
            if (status != 'attack' && status != 'jump') {
                if (status != 'walk') {
                    this.status.set(idPlayer, 'walk');
                }
                if (velocity.x == 0 && velocity.y == 0 && velocity.z == 0) {
                    if (status != 'idle') {
                        this.status.set(idPlayer, 'idle');
                    }
                }
                if (!this.getCollidingRigidBodies(idPlayer).includes('ground')) {
                    this.status.set(idPlayer, 'jump');
                }
            } else {
                return;
            }
            if (!rigidBody.isActive()) {
                rigidBody.setActivationState(1);
            }
            this.angles.set(idPlayer, angle);
            angle -= 180;
            const angleInRadians = angle * (Math.PI / 180);

            const rotatedVelocityX =
                Math.cos(angleInRadians) * velocity.x - Math.sin(angleInRadians) * velocity.z;
            const rotatedVelocityZ =
                Math.sin(angleInRadians) * velocity.x + Math.cos(angleInRadians) * velocity.z;

            const ammoVelocity = new this.ammo.btVector3(rotatedVelocityX, 0, rotatedVelocityZ);
            rigidBody.setLinearVelocity(ammoVelocity);
            this.ammo.destroy(ammoVelocity);
        }
    }

    public stepSimulation(timeStep: number = 1 / 30, maxSubSteps: number = 10) {
        this.dynamicsWorld.stepSimulation(timeStep, maxSubSteps);
        Session.getInstance()
            .getPlayers()
            .forEach((_, key) => {
                if (this.getCollidingRigidBodies(key).includes('ground')) {
                    if (this.status.get(key) == 'jump') {
                        this.status.set(key, 'idle');
                    }
                }
                if (
                    Date.now() - (this.attacks.get(key) ?? 0) > 920 &&
                    this.status.get(key) == 'attack'
                ) {
                    this.status.set(key, 'idle');
                }
                const velocity = this.rigidBodies.get(key)?.getLinearVelocity();
                if (velocity && velocity.x() == 0 && velocity.y() == 0 && velocity.z() == 0) {
                    if (this.status.get(key) != 'attack') {
                        this.status.set(key, 'idle');
                    }
                }
            });
    }

    public getDynamicsWorld() {
        return this.dynamicsWorld;
    }
}
