import Ammo from 'ammojs-typed';

export default class Projectile {
    private player: string;
    private rigidBody: Ammo.btRigidBody;
    private angle: number;

    constructor(player: string, rigidBody: Ammo.btRigidBody, angle: number) {
        this.player = player;
        this.rigidBody = rigidBody;
        this.angle = angle;
    }

    public getIdPlayer(): string {
        return this.player;
    }

    public getRigid() {
        return this.rigidBody;
    }

    public getAngle() {
        return this.angle;
    }
}
