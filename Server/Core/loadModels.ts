import * as pc from 'playcanvas';
import PhysicsWorld from './physicsWorld';
import Ammo from 'ammojs-typed';

export class ModelLoader {
    private app: pc.Application;
    private physicsWorld: PhysicsWorld;

    constructor(app: pc.Application, physicsWorld: PhysicsWorld) {
        this.app = app;
        this.physicsWorld = physicsWorld;
    }

    public loadModel(url: string, position: pc.Vec3) {
        this.app.assets.loadFromUrl(url, 'model', (err, asset) => {
            if (err) {
                console.error('Error loading model:', err);
                return;
            }

            const entity = new pc.Entity();
            entity.addComponent('model', {
                type: 'asset',
                asset: asset,
            });

            entity.setPosition(position);

            // Thêm đối tượng vật lý vào mô hình
            this.createPhysicsForModel(entity);

            // Thêm mô hình vào scene
            this.app.root.addChild(entity);
        });
    }

    private async createPhysicsForModel(entity: pc.Entity) {
        const scale = entity.getLocalScale();
        const position = entity.getPosition();
        const ammo = await Ammo();

        // Tạo shape (hình dạng vật lý) dựa trên mô hình (ví dụ box)
        const shape = new ammo.btBoxShape(new ammo.btVector3(scale.x / 2, scale.y / 2, scale.z / 2));

        // Tạo thông tin về khối lượng và khối lượng quán tính
        const mass = 1;
        const localInertia = new ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);

        // Tạo motion state
        const transform = new ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new ammo.btVector3(position.x, position.y, position.z));
        const motionState = new ammo.btDefaultMotionState(transform);

        // Tạo rigid body
        const rbInfo = new ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        const body = new ammo.btRigidBody(rbInfo);

        // Thêm rigid body vào thế giới vật lý
        this.physicsWorld.addRigidBody(body);
    }
}
