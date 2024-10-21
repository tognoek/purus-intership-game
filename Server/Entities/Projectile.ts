import Ammo from 'ammojs-typed';

export default class Projectile {
    private player: string;
    private rigidBody: Ammo.btRigidBody;
    private angle: number;
    private id: string;
    private char: number;
    private time: number;
    private is: boolean;

    constructor(
        id: string,
        player: string,
        rigidBody: Ammo.btRigidBody,
        char: number,
        angle: number,
        time: number
    ) {
        this.id = id;
        this.player = player;
        this.rigidBody = rigidBody;
        this.char = char;
        this.angle = angle;
        this.time = time;
        this.is = true;
    }

    public getId() {
        return this.id;
    }

    public isDie() {
        return this.time < 0;
    }

    public isLive(){
        return this.time > 0;
    }

    public update(){
        this.time -= 1;
        if (this.is){
            this.is = false;
            return true;
        }
    }

    public getIdPlayer(): string {
        return this.player;
    }

    public getRigid() {
        return this.rigidBody;
    }

    public getChar() {
        return this.char;
    }

    public getAngle() {
        return this.angle;
    }
}
