import Ammo from 'ammojs-typed';
import Session from './Session';
import Projectile from '../Entities/Projectile';
import { rotateAroundY } from '../Utils/Math';
import Models from '../Entities/Models';

export default class PhysicsWorld {
    private dynamicsWorld!: Ammo.btDiscreteDynamicsWorld;
    private ammo!: typeof Ammo;
    private rigidBodies: Map<string, Ammo.btRigidBody>;
    private forces: Map<string, { x: number; y: number; z: number }>;
    private angles: Map<string, number>;
    private projectiles: Projectile[];

    constructor() {
        this.angles = new Map();
        this.forces = new Map();
        this.rigidBodies = new Map();
        this.projectiles = [];
        this.init();
    }

    init() {
        this.ammo = Session.gI().getAmmo();
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

    public collisonProjectilePlayer(idPlayer: string): { playerA: string; playerB: string }[] {
        let result: { playerA: string; playerB: string }[] = [];
        const rigidBody = this.getRigidBodyById(idPlayer);
        let deleteProjectile: Projectile[] = [];

        if (!rigidBody) return result;
        const aabb0 = new this.ammo.btVector3();
        const aabb1 = new this.ammo.btVector3();

        rigidBody.getAabb(aabb0, aabb1);

        this.projectiles.forEach((item) => {
            if (item.getIdPlayer() !== idPlayer) {
                const aabb2 = new this.ammo.btVector3();
                const aabb3 = new this.ammo.btVector3();
                item.getRigid().getAabb(aabb2, aabb3);

                if (this.isAABBIntersect(aabb0, aabb1, aabb2, aabb3)) {
                    result.push({ playerA: idPlayer, playerB: item.getIdPlayer() });
                    deleteProjectile.push(item);
                }
            }
        });
        this.projectiles = this.projectiles.filter(
            (projectile) => !deleteProjectile.includes(projectile)
        );
        return result;
    }

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

    public getProjectile() {
        return this.projectiles;
    }

    public addProjectile(idPlayer: string, idChar: number) {
        let data;
        data = this.getRigidBodyPosition(idPlayer);
        if (data) {
            data = data as { x: number; y: number; z: number; angle: number };
            let newdata = { ...data };
            let position = rotateAroundY(
                { x: newdata.x, y: newdata.y, z: newdata.z },
                0,
                4,
                newdata.angle
            );
            position.y += 0.5;
            Models.getInstance().setInfo(position, { x: 0.1, y: 0.1, z: 0.1 }, 1);
            const rigidBody = Models.getInstance().createRigidBody();
            this.dynamicsWorld.addRigidBody(rigidBody);
            const velocity = { x: 0, y: 0, z: 0 };
            if (idChar == 0 || idChar == 3) {
                velocity.z = -800;
            } else {
                velocity.z = -4;
            }
            this.velocity(rigidBody, velocity, newdata.angle);
            this.projectiles.push(new Projectile(idPlayer, rigidBody, newdata.angle));
        }
    }

    public addRigidBody(idPlayer: string, rigidBody: Ammo.btRigidBody) {
        this.forces.set(idPlayer, { x: 0, y: 0, z: 0 });
        this.dynamicsWorld.addRigidBody(rigidBody);
        this.rigidBodies.set(idPlayer, rigidBody);
        this.angles.set(idPlayer, 180);
    }

    public removeRigidBody(idPlayer: string) {
        const rigidBody = this.rigidBodies.get(idPlayer);
        if (rigidBody) {
            this.dynamicsWorld.removeRigidBody(rigidBody);
            this.rigidBodies.delete(idPlayer);
            this.forces.delete(idPlayer);
        }
    }

    public removeProjectile(idPlayer: string) {
        this.projectiles = this.projectiles.filter((item) => item.getIdPlayer() != idPlayer);
    }

    public getRigidBodyById(idPlayer: string): Ammo.btRigidBody | undefined {
        return this.rigidBodies.get(idPlayer);
    }

    public getRigiBodis(): Map<string, Ammo.btRigidBody> {
        return this.rigidBodies;
    }
    public getRigidBodyPosition(
        id: string
    ): { x: number; y: number; z: number; angle: number } | null {
        const rigidBody = this.getRigidBodyById(id);
        if (rigidBody) {
            const motionState = rigidBody.getMotionState();
            if (motionState) {
                const transform = new this.ammo.btTransform();
                motionState.getWorldTransform(transform);
                const origin = transform.getOrigin();
                this.ammo.destroy(transform);
                let angle = this.angles.get(id);
                return {
                    x: origin.x(),
                    y: origin.y(),
                    z: origin.z(),
                    angle: angle ?? 180,
                };
            }
        }
        return null;
    }

    public getRigidProjectilePosition(
        projectile: Projectile
    ): { x: number; y: number; z: number; angle: number } | null {
        const rigidBody = projectile.getRigid();
        if (rigidBody) {
            const motionState = rigidBody.getMotionState();
            if (motionState) {
                const transform = new this.ammo.btTransform();
                motionState.getWorldTransform(transform);
                const origin = transform.getOrigin();
                this.ammo.destroy(transform);
                let angle = projectile.getAngle();
                return {
                    x: origin.x(),
                    y: origin.y(),
                    z: origin.z(),
                    angle: angle ?? 180,
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
            if (!rigidBody.isActive()) {
                rigidBody.setActivationState(1);
            }
            const ammoForce = new this.ammo.btVector3(force.x, force.y, force.z);
            rigidBody.applyCentralForce(ammoForce);
            this.ammo.destroy(ammoForce);
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
            this.forces.set(idPlayer, { x: rotatedVelocityX, y: 0, z: rotatedVelocityZ });
            rigidBody.setLinearVelocity(ammoVelocity);
            this.ammo.destroy(ammoVelocity);
        }
    }

    public velocity(
        rigidBody: Ammo.btRigidBody,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        velocity.x = 0;
        if (!rigidBody.isActive()) {
            rigidBody.setActivationState(1);
        }
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

    public getForce(idPlayer: string) {
        const rigidBody = this.getRigidBodyById(idPlayer);
        if (rigidBody) {
            const rigidBody = this.getRigidBodyById(idPlayer);
            if (rigidBody) {
                const velocity = rigidBody.getLinearVelocity();
                const currentVelocity = {
                    x: velocity.x(),
                    y: velocity.y(),
                    z: velocity.z(),
                };
                return currentVelocity;
            }
        }
        return null;
    }

    public getForceTwo(idPlayer: string) {
        return this.forces.get(idPlayer) ?? null;
    }

    public stepSimulation(timeStep: number = 1 / 30, maxSubSteps: number = 10) {
        this.dynamicsWorld.stepSimulation(timeStep, maxSubSteps);
    }
}
