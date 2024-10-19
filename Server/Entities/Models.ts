import Ammo from "ammojs-typed";
import Session from "../Core/Session";

export default class Models{
    private static instance: Models;
    private position: { x: number; y: number; z: number };
    private size: { x: number; y: number; z: number };
    private mass: number;
    private margin: number;
    private ammo!: typeof Ammo;

    private constructor() {
        this.position = {x: 0, y: 0, z: 0};
        this.size = {x: 0, y: 0, z: 0};
        this.mass = 1;
        this.margin = 0.05;
        this.ammo = Session.gI().getAmmo();
    }
    public static getInstance(): Models {
        if (!Models.instance) {
            Models.instance = new Models();
        }
        return Models.instance;
    }

    public setInfo(position: { x: number; y: number; z: number }, size: { x: number; y: number; z: number }, mass: number = 1, margin: number = 0.05){
        this.position = position;
        this.size = size;
        this.mass = mass;
        this.margin = margin;
    }

    public createRigidBody() :Ammo.btRigidBody {
        const shape = new this.ammo.btBoxShape(new this.ammo.btVector3(this.size.x, this.size.y, this.size.z));
        shape.setMargin(this.margin); 

        const transform = new this.ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new this.ammo.btVector3(this.position.x, this.position.y, this.position.z));

        const motionState = new this.ammo.btDefaultMotionState(transform);
        
        const localInertia = new this.ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(this.mass, localInertia);

        const rigidBodyInfo = new this.ammo.btRigidBodyConstructionInfo(this.mass, motionState, shape, localInertia);
        const rigidBody = new this.ammo.btRigidBody(rigidBodyInfo);
        return rigidBody;
    }
}