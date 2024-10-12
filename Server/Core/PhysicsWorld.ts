    import Ammo from 'ammojs-typed';

    export default class PhysicsWorld {
        private dynamicsWorld!: Ammo.btDiscreteDynamicsWorld;
        private ammo!: typeof Ammo;
        private rigidBodies: Map<string, Ammo.btRigidBody>;

        constructor() {
            this.rigidBodies = new Map();
        }

        async init() {
            this.ammo = await Ammo();

            const collisionConfiguration =
                new this.ammo.btDefaultCollisionConfiguration();
            const dispatcher = new this.ammo.btCollisionDispatcher(
                collisionConfiguration
            );
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

        public addRigidBody(idPlayer: string, rigidBody: Ammo.btRigidBody) {
            if(!this.dynamicsWorld){
                this.init().then( () => {
                    this.dynamicsWorld.addRigidBody(rigidBody);
                    this.rigidBodies.set(idPlayer, rigidBody);
                })
            }
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
        public getRigidBodyPosition(idPlayer: string): { x: number; y: number; z: number } | null {
            const rigidBody = this.getRigidBodyById(idPlayer);
            if (rigidBody) {
                const motionState = rigidBody.getMotionState();
                if (motionState) {
                    const transform = new this.ammo.btTransform();
                    motionState.getWorldTransform(transform);

                    const origin = transform.getOrigin();
                    return {
                        x: origin.x(),
                        y: origin.y(),
                        z: origin.z(),
                    };
                }
            }
            return null; // Nếu không tìm thấy rigidBody
        }
        public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
            const rigidBody = this.getRigidBodyById(idPlayer);
            if (rigidBody && rigidBody.isActive()) {
                // Tạo vectơ lực từ thông tin lực đầu vào
                const ammoForce = new this.ammo.btVector3(force.x, force.y, force.z);
                rigidBody.applyCentralForce(ammoForce);
            }
        }
        public stepSimulation(timeStep: number = 1 / 60, maxSubSteps: number = 10) {
            this.dynamicsWorld.stepSimulation(timeStep, maxSubSteps);
        }

        public getDynamicsWorld() {
            return this.dynamicsWorld;
        }
    }
