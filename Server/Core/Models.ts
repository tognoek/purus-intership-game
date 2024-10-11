import Ammo from "ammojs-typed";

export default class Models{
    private static instance: Models;
    private position: { x: number; y: number; z: number };
    private size: { x: number; y: number; z: number };
    private mass: number;
    private ammo!: typeof Ammo;
    constructor() {
        this.position = {x: 0, y: 0, z: 0};
        this.size = {x: 0, y: 0, z: 0};
        this.mass = 1;
        this.init();
    }
    public static getInstance(): Models {
        if (!Models.instance) {
            Models.instance = new Models();
        }
        return Models.instance;
    }

    async init(){
        this.ammo = await Ammo();
    }

    getInfo(position: { x: number; y: number; z: number }, size: { x: number; y: number; z: number }, mass: number = 1){
        this.position = position;
        this.size = size;
        this.mass = mass;
    }

    public createRigidBody() :Ammo.btRigidBody {
        // Tạo hình dạng va chạm (Collision Shape)
        const shape = new this.ammo.btBoxShape(new this.ammo.btVector3(this.size.x, this.size.y, this.size.z));
        shape.setMargin(0.05); // Thiết lập khoảng cách giữa các hình dạng

        // Tạo trạng thái chuyển động (Motion State)
        const transform = new this.ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new this.ammo.btVector3(this.position.x, this.position.y, this.position.z));

        const motionState = new this.ammo.btDefaultMotionState(transform);
        
        // Tính toán độ cản
        const localInertia = new this.ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(this.mass, localInertia);

        // Tạo RigidBody
        const rigidBodyInfo = new this.ammo.btRigidBodyConstructionInfo(this.mass, motionState, shape, localInertia);
        const rigidBody = new this.ammo.btRigidBody(rigidBodyInfo);

        return rigidBody;
    }
}