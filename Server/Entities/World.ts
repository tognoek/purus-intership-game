import fs from 'fs';
import path from 'path';

import PhysicsWorld from '../Core/PhysicsWorld';
import Models from './Models';

export default class World {
    private physicWorld: PhysicsWorld;
    private players: Array<string>;
    private projectile: Array<string>;
    private anys: Array<{ x: number; y: number; z: number }>;

    constructor() {
        this.physicWorld = new PhysicsWorld();
        this.players = new Array();
        this.projectile = new Array();
        this.anys = new Array();
        this.createGround();
        this.loadMapData();
    }

    public loadMapData() {
        try {
            const filePath = path.resolve(__dirname, '../DataBase/Map/map_1.json');

            const data = fs.readFileSync(filePath, 'utf8');
            const mapData = JSON.parse(data);

            mapData.boxes.forEach((box: any) => {
                const { position, size, mass } = box;
                Models.getInstance().setInfo(position, size, mass);
                const boxRigidBody = Models.getInstance().createRigidBody();
                this.anys.push(position);
                this.physicWorld.addBox(boxRigidBody);
            });
        } catch (error) {
            console.error('Không thể tải dữ liệu map:', error);
        }
    }

    public addPlayer(idPlayer: string) {
        Models.getInstance().setInfo(
            { x: Math.random() * 4 - 8, y: 20, z: 1 },
            { x: 1, y: 1, z: 1 },
            100
        );
        const rigidBody = Models.getInstance().createRigidBody();
        this.players.push(idPlayer);
        this.physicWorld.addRigidBody(idPlayer, rigidBody);
    }

    public addProjectile(idPlayer: string, idChar: number) {
        this.projectile.push(idPlayer);
        this.physicWorld.addProjectile(idPlayer, idChar);
    }

    public removePlayer(idPlayer: string) {
        this.players = this.players.filter((item) => item != idPlayer);
        this.physicWorld.removeRigidBody(idPlayer);
        this.physicWorld.removeProjectile(idPlayer);
    }

    public applyForce(idPlayer: string, force: { x: number; y: number; z: number }) {
        this.physicWorld.applyForce(idPlayer, force);
    }

    public applyVelocity(
        idPlayer: string,
        velocity: { x: number; y: number; z: number },
        angle: number
    ) {
        this.physicWorld.applyVelocity(idPlayer, velocity, angle);
    }

    public update(dt: number | null) {
        const timeStep = dt || 1 / 30;
        const maxSubSteps = 10;
        this.physicWorld.stepSimulation(timeStep, maxSubSteps);
    }
    private createGround() {
        const groundSize = { x: 50, y: 1, z: 50 };
        const groundMass = 0;
        Models.getInstance().setInfo({ x: 0, y: -0.5, z: 0 }, groundSize, groundMass);
        const groundRigidBody = Models.getInstance().createRigidBody();
        this.physicWorld.addRigidBody('ground', groundRigidBody);
        // Chiều cao và độ dày của tường
        const wallHeight = 8;
        const wallThickness = 1;
        const wallMass = 0;

        // Tạo các bức tường xung quanh
        // Tường bên trái
        Models.getInstance().setInfo(
            { x: -groundSize.x / 2, y: wallHeight / 2, z: 0 },
            { x: wallThickness, y: wallHeight, z: groundSize.z },
            wallMass
        );
        const leftWall = Models.getInstance().createRigidBody();
        this.physicWorld.addRigidBody('leftWall', leftWall);

        // Tường bên phải
        Models.getInstance().setInfo(
            { x: groundSize.x / 2, y: wallHeight / 2, z: 0 },
            { x: wallThickness, y: wallHeight, z: groundSize.z },
            wallMass
        );
        const rightWall = Models.getInstance().createRigidBody();
        this.physicWorld.addRigidBody('rightWall', rightWall);

        // Tường phía trước
        Models.getInstance().setInfo(
            { x: 0, y: wallHeight / 2, z: -groundSize.z / 2 },
            { x: groundSize.x, y: wallHeight, z: wallThickness },
            wallMass
        );
        const frontWall = Models.getInstance().createRigidBody();
        this.physicWorld.addRigidBody('frontWall', frontWall);

        // Tường phía sau
        Models.getInstance().setInfo(
            { x: 0, y: wallHeight / 2, z: groundSize.z / 2 },
            { x: groundSize.x, y: wallHeight, z: wallThickness },
            wallMass
        );
        const backWall = Models.getInstance().createRigidBody();
        this.physicWorld.addRigidBody('backWall', backWall);
    }

    public getAnys() {
        return this.anys;
    }

    public getData(): Record<string, any> {
        let result: Record<string, any> = {};
        this.players.forEach((id) => {
            let position = this.physicWorld.getRigidBodyPosition(id);
            if (position) {
                result[id] = position;
            }
        });
        return result;
    }

    public getForce(): Record<string, any> {
        let result: Record<string, any> = {};
        this.players.forEach((id) => {
            let force = this.physicWorld.getForceTwo(id);
            if (force) {
                result[id] = force;
            }
        });
        return result;
    }
    public getCollision(): Record<string, any> {
        let result: Record<string, any> = {};
        this.players.forEach((id) => {
            let collision = this.physicWorld.getCollidingRigidBodies(id);
            if (collision) {
                result[id] = collision;
            }
        });
        return result;
    }

    public getProjectile() {
        let result: Record<string, { x: number; y: number; z: number; angle: number }> = {};
        const projectiles = this.physicWorld.getProjectile();
        projectiles.forEach((projectile) => {
            const data = this.physicWorld.getRigidProjectilePosition(projectile);
            if (data) {
                result[projectile.getId()] = data;
            }
        });
        return result;
    }

    public getCollisionProjectile() {
        let result: { playerA: string; playerB: string }[] = [];
        this.players.forEach((player) => {
            return result.push(...this.physicWorld.collisonProjectilePlayer(player));
        });
        return result;
    }
}
